import { ISignUp, ISignUpSymbol } from '#application/api/iSignUp'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { IHashService, IHashServiceSymbol } from '#application/services/iHashService'
import { ITokenService, ITokenServiceSymbol } from '#application/services/iTokenService'
import { ISignUpUseCase, ISignUpUseCaseSymbol } from '#application/useCases/iSignUpUseCase'
import { SignUpUseCase } from '#application/useCases/signUpUseCase'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { SignUp } from '#external/api/signUp'
import { Errors } from '#external/errors/errors'
import UserRepository from '#external/repositories/userRepository'
import { HashService } from '#external/services/hashService'
import { TokenService } from '#external/services/tokenService'
import { Container } from 'inversify'

export class DIConatiner {
  public readonly container = new Container({ autoBindInjectable: true })

  init () : void {
    console.log('Starting container configuration...')

    this.container.bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository)
    this.container.bind<ISignUp>(ISignUpSymbol).to(SignUp)
    this.container.bind<ISignUpUseCase>(ISignUpUseCaseSymbol).to(SignUpUseCase)
    this.container.bind<IHashService>(IHashServiceSymbol).to(HashService)
    this.container.bind<ITokenService>(ITokenServiceSymbol).to(TokenService)
    this.container.bind<IErrors>(IErrorsSymbol).to(Errors)
  }
}
