import { SignUpUseCase, SignUpUseCaseSymbol } from "#application/useCases/signUpUseCase";
import { inject, injectable } from "inversify";


@injectable()
export class SignUp {
  constructor (
    @inject(SignUpUseCaseSymbol)
    private readonly signUpUseCase: SignUpUseCase
  ) {}

  run () {
    this.signUpUseCase.run()
  }
}

export const SignUpSymbol = Symbol.for("SignUp")