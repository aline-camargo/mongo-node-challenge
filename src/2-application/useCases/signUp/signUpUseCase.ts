import { InputUser } from '#application/dto/user/input'
import { OutputUser } from '#application/dto/user/output'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { IHashService, IHashServiceSymbol } from '#application/services/iHashService'
import { User } from '#domain/entities/user'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { inject, injectable } from 'inversify'
import { ISignUpUseCase } from './iSignUpUseCase'
import { ITokenService, ITokenServiceSymbol } from '#application/services/iTokenService'
import { IUserHelperSymbol, IUserHelper } from '#application/helpers/iUserHelper'

@injectable()
export class SignUpUseCase implements ISignUpUseCase {
  constructor (
    @inject(IUserRepositorySymbol)
    private readonly userRepository : IUserRepository,

    @inject(IUserHelperSymbol)
    private readonly userHelper : IUserHelper,

    @inject(IHashServiceSymbol)
    private readonly hashService : IHashService,

    @inject(ITokenServiceSymbol)
    private readonly tokenService : ITokenService,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (input: InputUser): Promise<OutputUser> {
    const userExists = await this.emailAlreadyRegistered(input.email)
    if (userExists) {
      const error = this.errors.getInvalidEmailError()
      return {
        result: error,
        success: false
      }
    }

    const hashedPassword = await this.getHashedPassword(input)
    const user = await this.createUser(input, hashedPassword)
    const token = await this.createToken(user)
    const updatedUser = await this.insertToken(user, token)
    return {
      result: this.userHelper.userToUserResult(updatedUser),
      success: true
    }
  }

  private async emailAlreadyRegistered (email: string) : Promise<boolean> {
    const result = await this.userRepository.findByEmail(email)
    return !!result
  }

  private getHashedPassword(input: InputUser) {
    return this.hashService.generateHash(input.senha)
  }

  private async insertToken(user: User, token: string) {
    return await this.userRepository.updateToken(user._id as string, token)
  }

  private async createToken(user: User) {
    return await this.tokenService.generateToken(user._id as string, user.nome, user.email)
  }

  private createUser (input: InputUser, hashedPassword: string): Promise<User> {
    return this.userRepository.create({ ...input, senha: hashedPassword })
  }
}

export const SignUpUseCaseSymbol = Symbol.for('SignUpUseCase')
