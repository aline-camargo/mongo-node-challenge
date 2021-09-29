import { SignUp, SignUpSymbol } from '#external/api/signUp'
import express from 'express'
import { DIConatiner } from './inversify.config'

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
      // fix dependcy injection
      const signUp = this.diContainer.container.get<SignUp>(SignUpSymbol)
      signUp.run()
      res.send('Hello World!');
    });
  }
}