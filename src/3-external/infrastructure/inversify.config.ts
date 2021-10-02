import { ISignUp, ISignUpSymbol } from '#application/api/iSignUp'
import { IUserRepository, IUserRepositorySymbol } from '#application/repositories/iUserRepository'
import { IHashService, IHashServiceSymbol } from '#application/services/iHashService'
import { ITokenService, ITokenServiceSymbol } from '#application/services/iTokenService'
import { ISignUpUseCase, ISignUpUseCaseSymbol } from '#application/useCases/signUp/iSignUpUseCase'
import { ISignInUseCase, ISignInUseCaseSymbol } from '#application/useCases/signIn/iSignInUseCase'
import { SignInUseCase } from '#application/useCases/signIn/signInUseCase'
import { SignUpUseCase } from '#application/useCases/signUp/signUpUseCase'
import { IErrors, IErrorsSymbol } from '#domain/error/iErrors'
import { SignUp } from '#external/api/signUp'
import { Errors } from '#external/errors/errors'
import UserRepository from '#external/repositories/userRepository'
import { HashService } from '#external/services/hashService'
import { TokenService } from '#external/services/tokenService'
import { Container } from 'inversify'
import { IUserHelper, IUserHelperSymbol } from '#application/helpers/iUserHelper'
import { UserHelper } from '#application/helpers/userHelper'
import { ISignIn, ISignInSymbol } from '#application/api/iSignIn'
import { SignIn } from '#external/api/signIn'

export class DIConatiner {
  public readonly container = new Container({ autoBindInjectable: true })

  init () : void {
    console.log('Starting container configuration...')

    this.container.bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository)
    this.container.bind<ISignUp>(ISignUpSymbol).to(SignUp)
    this.container.bind<ISignIn>(ISignInSymbol).to(SignIn)
    this.container.bind<ISignUpUseCase>(ISignUpUseCaseSymbol).to(SignUpUseCase)
    this.container.bind<ISignInUseCase>(ISignInUseCaseSymbol).to(SignInUseCase)
    this.container.bind<IUserHelper>(IUserHelperSymbol).to(UserHelper)
    this.container.bind<IHashService>(IHashServiceSymbol).to(HashService)
    this.container.bind<ITokenService>(ITokenServiceSymbol).to(TokenService)
    this.container.bind<IErrors>(IErrorsSymbol).to(Errors)
  }
}
