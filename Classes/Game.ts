import mockDatabase from './../database/mockDatabase'
import * as readline from 'readline'
import * as process from 'process'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export class Game {
  constructor (private name: string, protected gameMinutesDuration: number = 7, protected timeStarted: number = 0, protected usedSeconds: number = 0) {
    if (this.timeStarted !== 0 || this.usedSeconds !== 0) {
      throw new Error('Não pode alterar timeStarted e usedSeconds')
    }
  }

  private async sendMessage(msg: string, actualMessageString: number = 0) {
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

  private async checkTime (gameTime: number) {
    gameTime = gameTime - this.usedSeconds * 1000
    let timerCountdown = new Date(gameTime)
    const hours = timerCountdown.getHours() < 10 ? '0' + timerCountdown.getHours() : timerCountdown.getHours()
    const minutes = timerCountdown.getMinutes() < 10 ? '0' + timerCountdown.getMinutes() : timerCountdown.getMinutes()
    const getSeconds = timerCountdown.getSeconds() < 10 ? '0' + timerCountdown.getSeconds() : timerCountdown.getSeconds()
    if(timerCountdown > new Date()) {
      await this.sendMessage(`Com o tempo que usou, agora você tem até ${hours}:${minutes}:${getSeconds} para finalizar o jogo`)
      return true
    } else {
      await this.sendMessage('Seu tempo acabou. Você não salvou o mundo.')
      await this.gameOver()
    }
  }

  // PRIMEIRA ETAPA
  private async sceneOne () {
    const self = this
    async function askSceneTwo () {
      await self.sendMessage('Gostaria de rodar este fragmento novamente?')
      rl.question('S/N: ', async (resp) => {
        switch (resp.toLowerCase()) {
          case 's':
            self.sceneOne()
            return
          case 'n':
            await self.sceneTwo()
            return
          default:
            await self.sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
            self.gameOver()
            return
        }
      })
    }
    await this.sendMessage('O primeiro fragmento está lançado.\nPara fazer essa requisição GET, você não pode instalar nenhum pacote.\nApenas um pacote imbutido do Node.js será aceito.\n\nFaça a pesquisa nos sites abaixo:')
    rl.question('A) Digital Ocean\nB) Stack Overflow\nC) Google\nD) Tecmundo\n\nDigite a Letra desejada: ', async (value: string) => {
      switch (value.toLocaleLowerCase()) {
        case 'a':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Carregando "http://digitalocean.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.digitalOcean}`)
          await askSceneTwo()
          return
        case 'b':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Carregando "http://stackoverflow.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.stackOverflow}`)
          await askSceneTwo()
          return
        case 'c':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Carregando "http://google.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.google}`)
          await askSceneTwo()
          return
        case 'd':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Carregando "http://tecmundo.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.tecmundo}`)
          await askSceneTwo()
          return
        default:
          await self.sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
          self.gameOver()
          return
      }
    })
  }
  
  // SEGUNDA ETAPA
  private async sceneTwo () {
    await this.checkTime(this.timeStarted)
    const self = this
    async function askFinalScene () {
      await self.sendMessage('Gostaria de rodar este fragmento novamente?')
      rl.question('S/N: ', async (resp) => {
        switch (resp.toLowerCase()) {
          case 's':
            self.sceneTwo()
            return
          case 'n':
            await self.finalScene()
            return
          default:
            await self.sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
            self.gameOver()
            return
        }
      })
    }
    await this.sendMessage('Navegando na Deep Web você descobriu um Fórum onde usuários postaram uma charada que, quando solucionada, se revelará como uma URL. Selecione o post de um dos seguintes usuários:')
    rl.question('A) Usuário Tablet\nB) Usuário 9Dedos\nC) Solnobaro\nD) Ciríssimo\n\nDigite a Letra desejada: ', async (value: string) => {
      switch (value.toLocaleLowerCase()) {
        case 'a':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Usuário "Tablet"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.tablet}`)
          await askFinalScene()
          return
        case 'b':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Usuário "9Dedos"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.noveDedos}`)
          await askFinalScene()
          return
        case 'c':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Usuário "Solnobaro"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.solnobaro}`)
          await askFinalScene()
          return
        case 'd':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await self.sendMessage(`Usuário "Ciríssimo"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.cirissimo}`)
          await askFinalScene()
          return
        default:
          await self.sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
          self.gameOver()
          return
      }
    })
  }

  // FINAL
  async finalScene () {
    const self = this
    await this.sendMessage('Essa é a etapa final. É o momento que separa os meninos dos homens. Será que é capaz de mostrar que decifrou esse quebra-cabeças?')
    await this.sendMessage('Cada erro que cometer agora, lhe custarão 10 segundos do tempo restante. Espero que tenha printado a tela, o momento derradeiro chegou!')
    async function makeFinalQuestion () {
      self.usedSeconds = self.usedSeconds + 10
      await self.checkTime(self.timeStarted)
      await self.sendMessage('Digite o código que salvará a humanidade.')
      rl.question('Digite: ', async (value: string) => {
        switch (value.toLocaleLowerCase()) {
          case `fetch('wearetheworld.com').then(response => { return response })`:
            await self.win()
            return
          default:
            return makeFinalQuestion()
        }
      })
    }

    makeFinalQuestion()
  }  

  async play () {
    this.timeStarted = Date.now()
    this.timeStarted = this.timeStarted + 60 * 1000 * this.gameMinutesDuration
    let gameTimer = new Date(this.timeStarted)
    const hours = gameTimer.getHours() < 10 ? '0' + gameTimer.getHours() : gameTimer.getHours()
    const minutes = gameTimer.getMinutes() < 10 ? '0' + gameTimer.getMinutes() : gameTimer.getMinutes()
    const getSeconds = gameTimer.getSeconds() < 10 ? '0' + gameTimer.getSeconds() : gameTimer.getSeconds()
    await this.sendMessage(`Olá, ${this.name}, seja bem-vindo ao Coders Game!\nVocê tem até ${hours}:${minutes}:${getSeconds} para finalizar o jogo`)
    await this.sendMessage('Você precisa conseguir uma informação de uma API pública para salvar o mundo.')
    await this.sendMessage('Estas informações estão divididas em fragmentos que se encontram em diversos sites.\nPrintar a tela será fundamental em determinada etapa do jogo.')
    await this.sendMessage('Sua conexão com a internet é muito lenta. Ao abrir um site, 10 segundos lhe serão tomados. Use o tempo ao seu favor')
    await this.sendMessage(`Repetindo, você precisa terminar até às ${hours}:${minutes}:${getSeconds}.`)
    await this.sendMessage('Que o jogo comece!')

    await this.sceneOne()
  }

  async gameOver () {
    await this.sendMessage('Fim de Jogo. Você deu o seu melhor, mas não foi o suficiente.')
    await this.sendMessage(`Corra ${this.name}, está tudo prestes a...\n*BOOM*\nLigação encerrada.`)
    process.exit(0)
  }

  async win() {
    await this.sendMessage('Parabéns, você salvou o mundo de uma catástrofe sem precedentes!\nSeu nome ecoará por toda a história por este feito.\n\nVocê não ganhou nenhuma recompensa.')
    await this.sendMessage('Fim.')
    process.exit(0)
  }
}
