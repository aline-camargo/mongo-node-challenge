import { ISignUp, ISignUpSymbol } from "#application/api/iSignUp";
import { IUserRepository, IUserRepositorySymbol } from "#application/repositories/iUserRepository"
import { ISignUpUseCase, ISignUpUseCaseSymbol } from "#application/useCases/iSignUpUseCase";
import { SignUpUseCase } from "#application/useCases/signUpUseCase";
import { SignUp } from "#external/api/signUp";
import UserRepository from "#external/repositories/userRepository"
import { Container } from "inversify"


export class DIConatiner {

  public readonly container = new Container({ autoBindInjectable: true })

  init () {
    console.log("Starting container configuration...");

    this.container.bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository)
    this.container.bind<ISignUp>(ISignUpSymbol).to(SignUp)
    this.container.bind<ISignUpUseCase>(ISignUpUseCaseSymbol).to(SignUpUseCase)
  }
}
