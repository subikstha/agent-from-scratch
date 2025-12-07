import type { AIMessage } from '../types'
import { addMessages, getMessages, saveToolCallResponse } from './memory'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'
import { runTool } from './toolRunner'
export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('Thinking...')
  const history = await getMessages()

  const response = await runLLM({
    messages: history,
    tools,
  })
  await addMessages([response])
  console.log('-----------TOOL CALL LOG----------------')
  // NOTE: response can either have tool_calls or content
  // If it has tool_calls, it means the LLM has called a tool
  // If it has content, it means the LLM has completed all tool calls and has the final answer
  if (response.tool_calls) {
    // Then we call the tool runner
    const toolCall = response.tool_calls[0];
    loader.update(`Executing tool: ${toolCall.function.name}`)
    const toolResponse = await runTool(toolCall.function, userMessage)
    await saveToolCallResponse(toolCall.id, toolResponse)
    loader.update(`Executed tool ${toolCall.function.name}`)
    console.log('------------------ Tool Response Log----------------')
    logMessage(response);
    console.log('------------------ Tool Response Log----------------')
  }

  console.log('-----------TOOL CALL LOG----------------')
  console.log('------------------ Message Response Log----------------')
  logMessage(response)
  console.log('------------------ Message Response Log----------------')

  loader.stop()
  return getMessages()
}
