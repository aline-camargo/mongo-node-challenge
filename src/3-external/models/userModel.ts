import { v4 as uuidv4 } from 'uuid'
import { model, Schema } from 'mongoose'
import { User } from '#domain/entities/user'

const schema = new Schema<User>({
  _id: { type: String, default: uuidv4(), name: 'id' },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  // TODO: Fix class
  // @ts-ignore
  telefones: { type: Schema.Types.Mixed, required: true },
  ultimo_login: { type: Date },
  token: { type: String },
  age: Number
}, {
  // TODO: Check TZ
  timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' }
})

export const UserModel = model<User>('User', schema)
