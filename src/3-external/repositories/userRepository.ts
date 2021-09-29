import User from "#domain/entities/user"
import { IUserRepository } from "#application/repositories/iUserRepository"
import { UserModel, UserModelSymbol } from "#external/models/userModel"
import { inject, injectable } from "inversify"

@injectable()
export default class UserRepository implements IUserRepository {

  constructor (
    @inject(UserModelSymbol) private readonly model: typeof UserModel
  ) {}

  async create (user: User) : Promise<User> {
    return this.model.create(user)
  }
}