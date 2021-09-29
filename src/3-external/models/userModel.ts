import { model, Schema } from 'mongoose'
import User from '#domain/entities/user'

const schema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number
})

export const UserModel = model<User>('User', schema)

