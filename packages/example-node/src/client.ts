import { hc } from 'hono/client'
import { AppType } from './hono'
const client = hc<AppType>('/')

const res = await client.hello.$get({
  query: {
    name: 'Hono',
  },
})

if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}
