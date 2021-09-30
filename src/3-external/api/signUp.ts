import { ISignUp } from '#application/api/iSignUp'
import { InputUser } from '#application/dto/inputUser'
import { ISignUpUseCase, ISignUpUseCaseSymbol } from '#application/useCases/iSignUpUseCase'
import { User } from '#domain/entities/user'
import { validate } from 'class-validator'
import { Request } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export class SignUp implements ISignUp {
  constructor (
    @inject(ISignUpUseCaseSymbol)
    private readonly signUpUseCase: ISignUpUseCase
  ) {}

  // TODO: Fix output
  async run (request: Request): Promise<User> {
    const input = new InputUser(request.body)

    // TODO: tratamento de erros
    try {
      await validate(input)
      return this.signUpUseCase.run(input)
    } catch (err) {
      throw new Error('validation failed. errors: ' + err)
    }
  }
}

export const SignUpSymbol = Symbol.for('SignUp')
