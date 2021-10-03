import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { IVerifyToken } from '#external/api/verifyToken/iVerifyToken'
import { IErrorsSymbol, IErrors } from '#domain/error/iErrors'
import { IVerifyTokenUseCaseSymbol, IVerifyTokenUseCase } from '#application/useCases/verifyToken/iVerifyTokenUseCase'
import { OutputVerifyToken } from '#application/dto/verifyToken/output'

@injectable()
export class VerifyToken implements IVerifyToken {
  constructor (
    @inject(IVerifyTokenUseCaseSymbol)
    private readonly verifyTokenUseCase: IVerifyTokenUseCase,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (request: Request): Promise<OutputVerifyToken> {
    try {
      const headerKey = 'Bearer'
      let token
      if (request.headers) {
        if (request.headers.authentication) {
          const auth = request.headers.authentication as string
          const parts = auth.split(' ')
          if (parts.length === 2 && parts[0] === headerKey) {
            token = parts[1]
          }
        }
      }
      const result = await this.verifyTokenUseCase.run(token)
      return result
    } catch (err) {
      return {
        success: false,
        result: this.errors.getInternalError()
      }
    }
  }
}
