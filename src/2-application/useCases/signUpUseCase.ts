import { InputUser } from '#application/dto/inputUser'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { IHashService, IHashServiceSymbol } from '#application/services/hashService'
import { User } from '#domain/entities/user'
import { inject, injectable } from 'inversify'
import { ISignUpUseCase } from './iSignUpUseCase'

@injectable()
export class SignUpUseCase implements ISignUpUseCase {
  constructor (
    @inject(IUserRepositorySymbol)
    private readonly userRepository : IUserRepository,

    @inject(IHashServiceSymbol)
    private readonly hashService : IHashService
  ) {}

  // TODO: Fix output
  async run (input: InputUser): Promise<User> {
    try {
      const hashedPassword = await this.hashService.generateHash(input.senha)
      return this.userRepository.create({ ...input, senha: hashedPassword })
    } catch (err) {
      throw new Error('Creation error' + err)
    }
  }
}

export const SignUpUseCaseSymbol = Symbol.for('SignUpUseCase')
