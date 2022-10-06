export default async function sendMessage(msg: string, actualMessageString: number = 0) {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
  await delay(1500)
  const messageChars: number = msg.length
  while (actualMessageString < messageChars + 1) {
    const randomNumber = Math.floor((Math.random()*90))
    console.clear()
    if (actualMessageString === messageChars) {
      console.log(msg.slice(0, actualMessageString))
    } else {
      console.log(msg.slice(0, actualMessageString) + '|')
    }
    await delay(randomNumber)
    actualMessageString ++
  }
  await delay(3000)
}
