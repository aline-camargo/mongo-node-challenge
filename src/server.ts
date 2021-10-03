import 'reflect-metadata'
import dotenv from 'dotenv'
import { DIConatiner } from '#external/infrastructure/inversify.config'
import { Express } from '#external/infrastructure/express.config'
import { Mongoose } from '#external/infrastructure/mongoose.config'
class Main {
  private readonly mongooseConnection = new Mongoose()
  private readonly diContainer = new DIConatiner()
  private readonly express = new Express(this.diContainer)

  async init () {
    dotenv.config()
    this.diContainer.init()
    this.express.init()
    await this.mongooseConnection.init()
  }
}

const main = new Main()
main.init()
