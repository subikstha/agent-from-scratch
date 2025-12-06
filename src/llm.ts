import type { AIMessage } from '../types'
import { groq } from './ai'

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages,
    temperature: 0.1,
    tools,
    tool_choice: 'auto', // Auto means we want the LLM to figure out which tool to use
    //tool_choice: { type: 'function', function: { name: 'get_weather' } },
    parallel_tool_calls: false, // Disable calling multiple tools simultaneously
  })

  return response.choices[0].message
}
