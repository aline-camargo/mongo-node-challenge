import { IUserRepository, IUserRepositorySymbol } from "#application/repositories/iUserRepository"
import { SignUp, SignUpSymbol } from "#external/api/signUp";
import UserRepository from "#external/repositories/userRepository"
import { Container } from "inversify"


export class DIConatiner {

  public readonly container = new Container()

  init () {
    console.log("Starting container configuration...");

    this.container.bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository)
    this.container.bind<SignUp>(SignUpSymbol).to(SignUp)
  }
}
