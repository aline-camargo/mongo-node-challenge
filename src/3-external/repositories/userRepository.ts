import User from "#domain/entities/user"
import { IUserRepository } from "#application/repositories/iUserRepository"
import { UserModel } from "#external/models/userModel"
import { injectable } from "inversify"

@injectable()
export default class UserRepository implements IUserRepository {

  async create (user: User) : Promise<User> {
    return UserModel.create(user)
  }
}