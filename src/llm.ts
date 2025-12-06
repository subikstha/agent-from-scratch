import type { AIMessage } from '../types'
import { groq } from './ai'

export const runLLM = async ({
  model = '',
  messages,
  temperature = 0.1,
}: {
  model?: string
  messages: AIMessage[]
  temperature?: number
}) => {
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages,
    temperature,
  })

  return response.choices[0].message
}
