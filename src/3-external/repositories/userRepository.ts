import { v4 as uuidv4 } from 'uuid'
import { User } from '#domain/entities/user'
import { IUserRepository } from '#application/repositories/iUserRepository'
import { UserModel } from '#external/models/userModel'
import { injectable } from 'inversify'

@injectable()
export default class UserRepository implements IUserRepository {
  async create (user: User) : Promise<User> {
    return UserModel.create({ ...user, _id: uuidv4() })
  }

  async updateToken (id: string, token: string): Promise<User> {
    return UserModel.findByIdAndUpdate(id, { token: token }, { new: true })
  }

  async findByEmail (email: string) : Promise<User | null> {
    return UserModel.findOne({ email })
  }
}
