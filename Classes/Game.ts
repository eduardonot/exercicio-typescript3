import * as readline from 'readline'
import * as process from 'process'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export class Game {
  constructor (private name: string, protected gameMinutesDuration: number = 1) {}

  private async sendMessage(msg: string, actualMessageString: number = 0) {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
    await delay(2000)
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
    await delay(1000)
  }

  private async checkTime (gameTimer: Date) {
    if(gameTimer > new Date()) {
      return true
    } else {
      await this.sendMessage('Seu tempo acabou. Você não salvou o mundo.')
      process.exit(0)
    }
  }

  private async sceneOne () {
    
  }

  async play () {
    const self = this
    let date = Date.now()
    date = date + 60 * 1000 * this.gameMinutesDuration
    let gameTimer = new Date(date)
    const hours = gameTimer.getHours() < 10 ? '0' + gameTimer.getHours() : gameTimer.getHours()
    const minutes = gameTimer.getMinutes() < 10 ? '0' + gameTimer.getMinutes() : gameTimer.getMinutes()
    const getSeconds = gameTimer.getSeconds() < 10 ? '0' + gameTimer.getSeconds() : gameTimer.getSeconds()
    // await this.sendMessage(`Olá, ${this.name}, seja bem-vindo ao Coders Game!\nVocê tem até ${hours}:${minutes}:${getSeconds} para finalizar o jogo`)
    // await this.sendMessage('Você precisa conseguir uma informação de uma API pública para salvar o mundo.')
    // await this.sendMessage('Estas informações estão divididas em fragmentos que se encontram em diversos sites.')
    // await this.sendMessage('Sua conexão com a internet é muito lenta. Ao abrir um site, 10 segundos lhe serão tomados. Use o tempo ao seu favor')
    // await this.sendMessage(`Repetindo, você precisa terminar até às ${hours}:${minutes}:${getSeconds}.`)
    // await this.sendMessage('Que o jogo comece!')

    await this.sendMessage('Teste: ')
    rl.question('R:', async (value: string) => {
      await self.sendMessage(`Você digitou "${value}"`)
    })
    
  }
}
