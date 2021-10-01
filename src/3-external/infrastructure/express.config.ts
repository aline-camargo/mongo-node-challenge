import express from 'express'
import { ISignUpSymbol, ISignUp } from '#application/api/iSignUp'
import { injectable } from 'inversify'
import { DIConatiner } from './inversify.config'
import { IError } from '#domain/error/iErrors'
import { StatusCodes } from 'http-status-codes'

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
      const result = await signUp.run(req)

      if (result.success) {
        res
          .status(StatusCodes.CREATED)
          .send({ data: result.result })
      } else {
        const error = result.result as IError
        res
          .status(error.code || StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ mensagem: error.message })
      }
    })
  }
}
