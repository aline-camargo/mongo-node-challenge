import { v4 as uuidv4 } from 'uuid'
import moment from 'moment-timezone'
import { User } from '#domain/entities/user'
import { IUserRepository } from '#application/repositories/iUserRepository'
import { UserModel } from '#external/models/userModel'
import { injectable } from 'inversify'

@injectable()
export default class UserRepository implements IUserRepository {
  async create (user: User) : Promise<User> {
    return UserModel.create({ ...user, ultimo_login: moment(), _id: uuidv4() })
  }

  async updateToken (id: string, token: string): Promise<User> {
    return UserModel.findByIdAndUpdate(id, { token: token }, { new: true })
  }

  async updateLastLogin (id: string): Promise<User> {
    // @ts-ignore
    return UserModel.findByIdAndUpdate(id, { ultimo_login: moment() }, { new: true })
  }

  async findByEmail (email: string) : Promise<User | null> {
    return UserModel.findOne({ email })
  }

  async findById (id: string) : Promise<User | null> {
    return UserModel.findOne({ _id: id })
  }
}
