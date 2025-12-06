import type { AIMessage } from '../types'
import { addMessages, getMessages } from './memory'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'
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
  console.log('-----------TOOL CALL LOG----------------')
  if (response.tool_calls) {
    console.log(response.tool_calls)
  }
  console.log('-----------TOOL CALL LOG----------------')

  await addMessages([response])
  // logMessage(response)

  loader.stop()
  return getMessages()
}
