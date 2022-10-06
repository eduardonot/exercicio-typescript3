import mockDatabase from './../database/mockDatabase'
import sendMessage from './../utils/sendMessage'
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
  
  private async checkTime (gameTime: number) {
    gameTime = gameTime - this.usedSeconds * 1000
    let timerCountdown = new Date(gameTime)
    if(timerCountdown > new Date()) {
      return true
    } else {
      await sendMessage('Seu tempo acabou. Você não salvou o mundo.')
      await this.gameOver()
    }
  }

  // PRIMEIRA ETAPA
  private async sceneOne () {
    await this.checkTime(this.timeStarted)
    const self = this
    async function askSceneTwo () {
      await sendMessage('Gostaria de rodar este fragmento novamente?')
      rl.question('S/N: ', async (resp) => {
        switch (resp.toLowerCase()) {
          case 's':
            self.sceneOne()
            return
          case 'n':
            await self.sceneTwo()
            return
          default:
            await sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
            self.gameOver()
            return
        }
      })
    }
    await sendMessage('O primeiro fragmento está lançado.\nPara fazer essa requisição GET, você não pode instalar nenhum pacote.\nApenas um pacote imbutido do Node.js será aceito.\n\nFaça a pesquisa nos sites abaixo:')
    rl.question('A) Digital Ocean\nB) Stack Overflow\nC) Google\nD) Tecmundo\n\nDigite a Letra desejada: ', async (value: string) => {
      switch (value.toLocaleLowerCase()) {
        case 'a':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Carregando "http://digitalocean.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.digitalOcean}`)
          await askSceneTwo()
          return
        case 'b':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Carregando "http://stackoverflow.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.stackOverflow}`)
          await askSceneTwo()
          return
        case 'c':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Carregando "http://google.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.google}`)
          await askSceneTwo()
          return
        case 'd':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Carregando "http://tecmundo.com"\nAqui vai o resultado\n\n${mockDatabase.sceneOne.tecmundo}`)
          await askSceneTwo()
          return
        default:
          await sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
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
      await sendMessage('Gostaria de rodar este fragmento novamente?')
      rl.question('S/N: ', async (resp) => {
        switch (resp.toLowerCase()) {
          case 's':
            self.sceneTwo()
            return
          case 'n':
            await self.finalScene()
            return
          default:
            await sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
            self.gameOver()
            return
        }
      })
    }
    await sendMessage('Navegando na Deep Web você descobriu um Fórum onde usuários postaram uma charada que, quando solucionada, se revelará como uma URL. Selecione o post de um dos seguintes usuários:')
    rl.question('A) Usuário Tablet\nB) Usuário 9Dedos\nC) Usuário Solnobaro\nD) Usuário Ciríssimo\n\nDigite a Letra desejada: ', async (value: string) => {
      switch (value.toLocaleLowerCase()) {
        case 'a':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Usuário "Tablet"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.tablet}`)
          await askFinalScene()
          return
        case 'b':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Usuário "9Dedos"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.noveDedos}`)
          await askFinalScene()
          return
        case 'c':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Usuário "Solnobaro"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.solnobaro}`)
          await askFinalScene()
          return
        case 'd':
          console.clear()
          this.usedSeconds = this.usedSeconds + 10
          await sendMessage(`Usuário "Ciríssimo"\nAqui vai a charada\n\n${mockDatabase.sceneTwo.cirissimo}`)
          await askFinalScene()
          return
        default:
          await sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
          self.gameOver()
          return
      }
    })
  }

  // FINAL
  async finalScene () {
    const self = this
    await sendMessage('Essa é a etapa final. É o momento que separa os meninos dos homens. Será que é capaz de mostrar que decifrou esse quebra-cabeças?')
    await sendMessage('Cada erro que cometer agora, lhe custarão 10 segundos do tempo restante. Espero que tenha printado a tela, o momento derradeiro chegou!')
    async function makeQuestion () {
      self.usedSeconds = self.usedSeconds + 10
      await self.checkTime(self.timeStarted)
      await sendMessage('Você agora tem 3 opções:\n')
      rl.question('1) - Retornar ao primeiro fragmento\n2) - Retornar ao segundo fragmento\n3) - Digitar o código:\n\nDigite a opção desejada: ', async (value: string) => {
        switch (value.toLocaleLowerCase()) {
          case '1':
            await sendMessage('Você optou por retornar ao início')
            await self.sceneOne()
            return
          case '2':
            await sendMessage('Você optou por retornar ao fragmento anterior')
            await self.sceneTwo()
            return
          case '3':
            await sendMessage('Você optou por digitar o código que salvará a humanidade. Cada erro lhe custarão 10 segundos')
            rl.question('Digite o código: ', async (resp) => {
              switch (resp) {
                case `fetch('wearetheworld.com').then(response => { return response })`:
                  await self.checkTime(self.timeStarted)
                  await self.win()
                  return
                default:
                  await sendMessage('Você errou.')
                  return makeQuestion()
              }
            })
            return
          default:
            await sendMessage('Parece que você selecionou uma opção inválida. A destruição do planeta é iminente!')
            self.gameOver()
            return
        }
      })
    }
    makeQuestion()
  }  

  async play () {
    this.timeStarted = Date.now()
    this.timeStarted = this.timeStarted + 60 * 1000 * this.gameMinutesDuration
    let gameTimer = new Date(this.timeStarted)
    const hours = gameTimer.getHours() < 10 ? '0' + gameTimer.getHours() : gameTimer.getHours()
    const minutes = gameTimer.getMinutes() < 10 ? '0' + gameTimer.getMinutes() : gameTimer.getMinutes()
    const getSeconds = gameTimer.getSeconds() < 10 ? '0' + gameTimer.getSeconds() : gameTimer.getSeconds()
    await sendMessage(`Olá, ${this.name}, seja bem-vindo ao Coders Game!\nVocê tem até ${hours}:${minutes}:${getSeconds} para finalizar o jogo`)
    await sendMessage('Você precisa conseguir uma informação de uma API pública para salvar o mundo.')
    await sendMessage('Estas informações estão divididas em fragmentos que se encontram em diversos sites.\nPrintar a tela poderá ser fundamental para o seu sucesso.')
    await sendMessage('Sua conexão com a internet é muito lenta. Ao abrir um site, 10 segundos lhe serão tomados. Use o tempo ao seu favor')
    await sendMessage(`Repetindo, você precisa terminar até às ${hours}:${minutes}:${getSeconds}.`)
    await sendMessage('Que o jogo comece!')

    await this.sceneOne()
  }

  async gameOver () {
    await sendMessage('Fim de Jogo. Você deu o seu melhor, mas não foi o suficiente.')
    await sendMessage(`Corra ${this.name}, está tudo prestes a...\n*BOOM*\nLigação encerrada.`)
    process.exit(0)
  }

  async win() {
    await sendMessage('Parabéns, você salvou o mundo de uma catástrofe sem precedentes!\nSeu nome ecoará por toda a história por este feito.\n\nVocê ganhou uma recompensa.')
    await sendMessage('https://www.youtube.com/watch?v=s3wNuru4U0I')
    process.exit(0)
  }
}
