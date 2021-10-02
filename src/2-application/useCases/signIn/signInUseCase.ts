import { InputUser } from '#application/dto/user/input'
import { OutputUser } from '#application/dto/user/output'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { IHashService, IHashServiceSymbol } from '#application/services/iHashService'
import { User } from '#domain/entities/user'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { inject, injectable } from 'inversify'
import { ISignInUseCase } from './iSignInUseCase'
import { IUserHelperSymbol, IUserHelper } from '#application/helpers/iUserHelper'

@injectable()
export class SignInUseCase implements ISignInUseCase {
  constructor (
    @inject(IUserRepositorySymbol)
    private readonly userRepository : IUserRepository,

    @inject(IUserHelperSymbol)
    private readonly userHelper : IUserHelper,

    @inject(IHashServiceSymbol)
    private readonly hashService : IHashService,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (input: InputUser): Promise<OutputUser> {
    const user = await this.getUserByEmail(input.email)
    if (!user) {
      return this.getSignInError()
    }

    const validPassword = await this.validateHashedPassword(input.senha, user.senha)

    if (validPassword && user._id) {
      const updatedUser = await this.userRepository.updateLastLogin(user._id)
      return {
        result: this.userHelper.userToUserResult(updatedUser),
        success: true
      }
    } else {
      return this.getSignInError()
    }
  }

  private getSignInError () {
    const error = this.errors.getInvalidSignInError()
    return {
      result: error,
      success: false
    }
  }

  private validateHashedPassword (password: string, hashedPassword: string): Promise<boolean> {
    return this.hashService.compareHash(password, hashedPassword)
  }

  private async getUserByEmail (email: string) : Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }
}
