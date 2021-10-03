import moment from 'moment-timezone'
import { OutputVerifyToken } from '#application/dto/verifyToken/output'
import { ITokenService, ITokenServiceSymbol } from '#application/services/iTokenService'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { inject, injectable } from 'inversify'
import { IVerifyTokenUseCase } from './iVerifyTokenUseCase'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { User } from '#domain/entities/user'

@injectable()
export class VerifyTokenUseCase implements IVerifyTokenUseCase {

  private readonly toleranceTime = process.env.TOKEN_TOLERANCE_AMOUNT || '30'

  constructor (
    @inject(ITokenServiceSymbol)
    private readonly tokenService: ITokenService,

    @inject(IUserRepositorySymbol)
    private readonly userRepository: IUserRepository,

    @inject(IErrorsSymbol)
    private readonly errors: IErrors
  ) {}

  async run (token?: string): Promise<OutputVerifyToken> {
    if (token === undefined) return this.getUnauthorizedError()
    const validToken = this.tokenService.validateToken(token)

    const user = await this.userRepository.findById(validToken.id)

    const isInsideToleranceLastSignIn = this.isInsideToleranceLastSignIn(user)

    if (validToken.success && validToken.id && isInsideToleranceLastSignIn) {
      return {
        success: validToken.success,
        result: validToken.id
      }
    } else {
      return this.getUnauthorizedError()
    }
  }

  private isInsideToleranceLastSignIn (user: User | null) : boolean {
    let result = false
    if (user && user.ultimo_login) {
      const now = moment()
      const lastLoginMoment = moment(user.ultimo_login)
      result = now < lastLoginMoment.add(+this.toleranceTime, 'minutes')
    }
    return result
  }

  private getUnauthorizedError (): OutputVerifyToken | PromiseLike<OutputVerifyToken> {
    return {
      success: false,
      result: this.errors.getUnauthorizedError()
    }
  }
}
