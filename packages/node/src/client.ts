import { hello, helloInputSchema } from './hono'

const input = helloInputSchema.parse({
  name: 'oRPC',
})

const data = hello(input)
console.log(data.message)
