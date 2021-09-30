import { ISignUp } from '#application/api/iSignUp'
import { InputUser } from '#application/dto/inputUser'
import { ISignUpUseCase, ISignUpUseCaseSymbol } from '#application/useCases/iSignUpUseCase'
import { User } from '#domain/entities/user'
import { invalidEmail, internalError } from '#domain/error/errors'
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

    try {
      input.validate()
      const result = await this.signUpUseCase.run(input)
      return result
    } catch (err) {
      console.log(err)
      switch (err) {
        case invalidEmail:
          throw err
        // TODO: tratamento de erros de validacao
        // case 'An instance of InputUser has failed the validation':
        //   throw 'ie'
        default:
          throw internalError
      }
    }
  }
}

export const SignUpSymbol = Symbol.for('SignUp')
