import moment from 'moment-timezone'
import { InputUser } from '#application/dto/inputUser'
import { OutputUser } from '#application/dto/outputUser'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { IHashService, IHashServiceSymbol } from '#application/services/hashService'
import { User } from '#domain/entities/user'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { inject, injectable } from 'inversify'
import { ISignUpUseCase } from './iSignUpUseCase'

@injectable()
export class SignUpUseCase implements ISignUpUseCase {
  constructor (
    @inject(IUserRepositorySymbol)
    private readonly userRepository : IUserRepository,

    @inject(IHashServiceSymbol)
    private readonly hashService : IHashService,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (input: InputUser): Promise<OutputUser> {
    if (await this.emailAlreadyRegistered(input.email)) {
      const error =  this.errors.getInvalidEmailError()
      return {
        result: error,
        success: false
      }
    }

    const hashedPassword = await this.hashService.generateHash(input.senha)
    const user = await this.createUser(input, hashedPassword)
    return {
      result: this.userToOutputUser(user),
      success: true
    }
  }

  private createUser(input: InputUser, hashedPassword: string): Promise<User> {
    return this.userRepository.create({ ...input, senha: hashedPassword })
  }

  private async emailAlreadyRegistered(email: string) : Promise<boolean> {
    const result = await this.userRepository.findByEmail(email)
    return !!result
  }

  private userToOutputUser(user: User) {
    return {
      id: user._id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      telefones: user.telefones,
      data_atualizacao: this.getTimeZoneDate(user.data_atualizacao),
      data_criacao: this.getTimeZoneDate(user.data_criacao),
      ultimo_login: this.getTimeZoneDate(user.ultimo_login),
      token: user.token
    }
  }

  private getTimeZoneDate(date?: Date) {
    return moment.tz(date, 'America/Sao_Paulo').utc(true).toDate()
  }
}

export const SignUpUseCaseSymbol = Symbol.for('SignUpUseCase')
