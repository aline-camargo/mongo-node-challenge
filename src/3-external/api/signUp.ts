import { ISignUp } from "#application/api/iSignUp";
import { ISignUpUseCase, ISignUpUseCaseSymbol } from "#application/useCases/iSignUpUseCase";
import { inject, injectable } from "inversify";


@injectable()
export class SignUp implements ISignUp {
  constructor (
    @inject(ISignUpUseCaseSymbol)
    private readonly signUpUseCase: ISignUpUseCase
  ) {}

  run () {
    this.signUpUseCase.run()
  }
}

export const SignUpSymbol = Symbol.for("SignUp")