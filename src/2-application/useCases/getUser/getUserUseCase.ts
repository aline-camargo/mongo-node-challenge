import { OutputUser } from '#application/dto/user/output'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { User } from '#domain/entities/user'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { inject, injectable } from 'inversify'
import { IGetUserUseCase } from './iGetUserUseCase'
import { IUserHelperSymbol, IUserHelper } from '#application/helpers/iUserHelper'

@injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor (
    @inject(IUserRepositorySymbol)
    private readonly userRepository : IUserRepository,

    @inject(IUserHelperSymbol)
    private readonly userHelper : IUserHelper,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (userId: string): Promise<OutputUser> {
    const user = await this.getUserById(userId)

    if (user) {
      return {
        success: true,
        result: this.userHelper.userToUserResult(user)
      }
    } else {
      return {
        success: false,
        result: this.errors.getUnauthorizedError()
      }
    }
  }

  private async getUserById (id: string) : Promise<User | null> {
    return this.userRepository.findById(id)
  }
}
