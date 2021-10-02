import { OutputVerifyToken } from "#application/dto/verifyToken/output"
import { ITokenService, ITokenServiceSymbol } from "#application/services/iTokenService"
import { IErrors, IErrorsSymbol } from "#domain/error/iErrors"
import { inject, injectable } from "inversify"
import { IVerifyTokenUseCase } from "./iVerifyTokenUseCase"
import moment from "moment-timezone"

@injectable()
export class VerifyTokenUseCase implements IVerifyTokenUseCase {

  constructor (
    @inject(ITokenServiceSymbol)
    private readonly tokenService: ITokenService,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run(token?: string): Promise<OutputVerifyToken> {
    if (token === undefined) return this.getUnauthorizedError()
    const validToken = this.tokenService.validateToken(token)
    const isInsideToleranceLastSignIn = this.isInsideToleranceLastSignIn(validToken.last_login)

    console.log(validToken);
    
    if (validToken.success && validToken.id && isInsideToleranceLastSignIn) {
      return {
        success: validToken.success,
        result: validToken.id
      }
    } else {
      return this.getUnauthorizedError()
    }
  }

  private isInsideToleranceLastSignIn(date?: Date) : boolean {
    let result = false
    if (date) {
      const now = moment()
      const lastLoginMoment = moment(date)
      result =  now < lastLoginMoment.add(30, 'minutes')
    }
    return result
  }

  private getUnauthorizedError(): OutputVerifyToken | PromiseLike<OutputVerifyToken> {
    return {
      success: false,
      result: this.errors.getUnauthorizedError()
    }
  }
}
