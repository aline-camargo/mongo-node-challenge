import express, { NextFunction, Request, Response } from 'express'
import { injectable } from 'inversify'
import { StatusCodes } from 'http-status-codes'
import { ISignUpSymbol, ISignUp } from '#external/api/signUp/iSignUp'
import { ISignIn, ISignInSymbol } from '#external/api/signIn/iSignIn'
import { DIConatiner } from './inversify.config'
import { IError } from '#domain/error/iErrors'
import { IVerifyToken, IVerifyTokenSymbol } from '#external/api/verifyToken/iVerifyToken'
import { IGetUser, IGetUserSymbol } from '#external/api/getUser/iGetUser'

@injectable()
export class Express {
  public readonly app = express()
  private readonly port = process.env.SERVER_PORT || 3000

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

  private setUp () : void {
    this.signUpEndpoint()
    this.signInEndpoint()
    this.getUserEndpoint()
  }

  private signUpEndpoint () {
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
          .status(error.code)
          .send({ mensagem: error.message })
      }
    })
  }

  private signInEndpoint () {
    this.app.post('/signIn', async (req, res) => {
      const signIn = this.diContainer.container.get<ISignIn>(ISignInSymbol)
      const result = await signIn.run(req)

      if (result.success) {
        res
          .status(StatusCodes.OK)
          .send({ data: result.result })
      } else {
        const error = result.result as IError
        res
          .status(error.code)
          .send({ mensagem: error.message })
      }
    })
  }

  private getUserEndpoint () {
    this.app.get('/user/:userId', (req, res, next) => this.verifyToken(req, res, next), async (req, res) => {
      const getUser = this.diContainer.container.get<IGetUser>(IGetUserSymbol)
      const result = await getUser.run(req)

      if (result.success) {
        res
          .status(StatusCodes.OK)
          .send({ data: result.result })
      } else {
        const error = result.result as IError
        res
          .status(error.code)
          .send({ mensagem: error.message })
      }
    })
  }

  private async verifyToken (req: Request, res: Response, next: NextFunction) {
    const verifyToken = this.diContainer.container.get<IVerifyToken>(IVerifyTokenSymbol)
    const result = await verifyToken.run(req)

    if (result.success) {
      req.params = { ...req.params, tokenUserId: result.result as string }
      next()
    } else {
      const error = result.result as IError
      res.status(error.code).send({ mensagem: error.message })
    }
  }
}
