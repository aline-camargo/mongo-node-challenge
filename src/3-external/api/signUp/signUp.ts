import { ISignUp } from '#external/api/signUp/iSignUp'
import { InputUser } from '#application/dto/user/input'
import { OutputUser } from '#application/dto/user/output'
import { ISignUpUseCase, ISignUpUseCaseSymbol } from '#application/useCases/signUp/iSignUpUseCase'
import { IErrorsSymbol, IErrors } from '#domain/error/iErrors'
import { Request } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export class SignUp implements ISignUp {
  constructor (
    @inject(ISignUpUseCaseSymbol)
    private readonly signUpUseCase: ISignUpUseCase,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (request: Request): Promise<OutputUser> {
    try {
      const input = new InputUser(request.body)
      const valid = input.validate()

      if (!valid.isValid) {
        const validationError = this.errors.getValidationError()
        return {
          result: {
            ...validationError,
            message: validationError.message + valid.errorsList
          },
          success: valid.isValid
        }
      }

      const result = await this.signUpUseCase.run(input)
      return result
    } catch (err) {
      return {
        result: this.errors.getInternalError(),
        success: false
      }
    }
  }
}

export const SignUpSymbol = Symbol.for('SignUp')
