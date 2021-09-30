import { connect } from 'mongoose'

export class Mongoose {
  async init () : Promise<void> {
    console.log('Initializing db')
    try {
      await connect('mongodb://localhost:27017', {
        user: 'superuser',
        pass: 'root',
        dbName: 'test'
      })
    } catch (error) {
      console.log(error)
    }
    console.log('Successfully connected!')
  }
}
