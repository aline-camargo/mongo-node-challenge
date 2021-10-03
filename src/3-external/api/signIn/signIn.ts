import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { ISignIn } from '#external/api/signIn/iSignIn'
import { OutputUser } from '#application/dto/user/output'
import { ISignInUseCase, ISignInUseCaseSymbol } from '#application/useCases/signIn/iSignInUseCase'
import { IErrorsSymbol, IErrors } from '#domain/error/iErrors'
import { InputSignIn } from '#application/dto/signIn/input'

@injectable()
export class SignIn implements ISignIn {
  constructor (
    @inject(ISignInUseCaseSymbol)
    private readonly signInUseCase: ISignInUseCase,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (request: Request): Promise<OutputUser> {
    try {
      const input = new InputSignIn(request.body)
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

      const result = await this.signInUseCase.run(input)
      return result
    } catch (err) {
      return {
        result: this.errors.getInternalError(),
        success: false
      }
    }
  }
}

