import express from 'express'
import { ISignUpSymbol, ISignUp } from '#application/api/iSignUp'
import { injectable } from 'inversify'
import { DIConatiner } from './inversify.config'

@injectable()
export class Express {
  public readonly app = express()
  private readonly port = 3000

  constructor (
    private readonly diContainer = new DIConatiner()
  ) {}

  init () : void {
    this.app.use(express.json())

    this.app.listen(this.port, () =>
      console.log('Example app listening on port 3000!')
    )

    this.setUp()
  }

  setUp () : void {
    this.app.post('/user', async (req, res) => {
      const signUp = this.diContainer.container.get<ISignUp>(ISignUpSymbol)
      try {
        const result = await signUp.run(req)
        res.send({ data: result })
      } catch (err) {
        res.send({ mensagem: err })
      }
    })
  }
}
