type TFact = (fatc: TFact, n: number) => number
// Fact
const fact4 = ((n: number) => {
  return ((fact: TFact) => {
    return fact(fact, n)
  })((fact: TFact, n: number) => {
    return n===0?1: n * fact(fact, n - 1)
  })
})(4)

console.log(`4! = ${fact4}`)