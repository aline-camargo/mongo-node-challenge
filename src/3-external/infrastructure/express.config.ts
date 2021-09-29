import express from 'express'
import { ISignUpSymbol, ISignUp } from '#application/api/iSignUp'
import { injectable } from 'inversify'
import { DIConatiner } from './inversify.config'

@injectable()
export class Express {

  public readonly app = express()
  private readonly port = 3000

  constructor(
    private readonly diContainer = new DIConatiner()
  ) {}

  init () {
    this.app.listen(this.port, () =>
      console.log('Example app listening on port 3000!'),
    )

    this.setUp()
  }

  setUp () {
    this.app.post('/user', (req, res) => {
      const signUp = this.diContainer.container.get<ISignUp>(ISignUpSymbol)
      signUp.run()
      res.send('Hello World!');
    });
  }
}