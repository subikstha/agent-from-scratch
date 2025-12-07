
import { runTool } from './src/toolRunner'

const test = async () => {
    try {
        const weather = await runTool({
            name: 'getWeather',
            arguments: JSON.stringify({ city: 'Kathmandu' })
        }, 'What is the weather in Kathmandu?')

        console.log('Weather Tool Result:', weather)

        if (weather === 'It is hot, 90deg in Kathmandu') {
            console.log('SUCCESS: Weather tool returned expected result')
        } else {
            console.error('FAILURE: Weather tool returned unexpected result')
            process.exit(1)
        }

    } catch (e) {
        console.error('Error running tool:', e)
        process.exit(1)
    }
}

test()
