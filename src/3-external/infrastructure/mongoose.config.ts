import { connect } from 'mongoose'

export class Mongoose {
  private readonly localConfiguration = {
    url: 'mongodb://localhost:27017',
    user: 'superuser',
    pass: 'root',
    dbName: 'test'
  }

  async init () : Promise<void> {
    console.log('Initializing db')
    try {
      await connect(process.env.MONGO_CONNECTION_URI || this.localConfiguration.url)
    } catch (error) {
      console.log('Error connecting to data source: ', error)
    }
    console.log('Successfully connected!')
  }
}
