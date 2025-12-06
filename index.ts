import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherSchema = z.object({
  city: z.string(),
  reasoning: z.string().describe("Why did you pick this tool?"),
})

const weatherTool = {
  type: 'function',
  function: {
    name: 'getWeather',
    description: 'Get the weather for a city',
    parameters: zodToJsonSchema(weatherSchema, "weatherTool"),
  },
}

const response = await runAgent({
  userMessage,
  tools: [weatherTool],
})

console.log(response)
