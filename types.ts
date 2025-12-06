import type { ChatCompletionMessage } from 'groq-sdk/resources/chat.mjs'

export type AIMessage =
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }
  | { role: 'assistant'; content: ChatCompletionMessage }

export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}
