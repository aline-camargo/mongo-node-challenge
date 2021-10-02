import { OutputUser } from '#application/dto/user/output'
import { IGetUserUseCaseSymbol, IGetUserUseCase } from '#application/useCases/getUser/iGetUserUseCase'
import { IErrorsSymbol, IErrors } from '#domain/error/iErrors'
import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { IGetUser } from './iGetUser'

@injectable()
export class GetUser implements IGetUser {
  constructor (
    @inject(IGetUserUseCaseSymbol)
    private readonly getUserUseCase: IGetUserUseCase,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (request: Request): Promise<OutputUser> {
    try {
      const allowedUser = request.params.userId === request.params.tokenUserId

      if (allowedUser) {
        const result = await this.getUserUseCase.run(request.params.userId)
        return result
      } else {
        return {
          success: false,
          result: this.errors.getUnauthorizedError()
        }
      }
    } catch (err) {
      return {
        success: false,
        result: this.errors.getInternalError()
      }
    }
  }
}
