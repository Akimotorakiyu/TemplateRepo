import { z } from 'zod'

export const helloInputSchema = z.object({
  name: z.string(),
})

export type HelloInput = z.infer<typeof helloInputSchema>

export const hello = (input: HelloInput) => {
  return {
    message: `Hello! ${input.name}`,
  }
}
