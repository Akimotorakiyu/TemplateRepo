export async function sayHello(getName: () => string) {
  console.log(`hello world! \n--${await getName()}`)
}
