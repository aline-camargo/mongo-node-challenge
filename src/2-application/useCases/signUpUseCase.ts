import { IUserRepository, IUserRepositorySymbol } from "#application/repositories/iUserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class SignUpUseCase {

  constructor (
    @inject(IUserRepositorySymbol)
    private readonly userRepository : IUserRepository
  ) {}

  run () {
    this.userRepository.create({
      firstName: '',
      lastName: '',
      age: 0
    })
  }
}

export const SignUpUseCaseSymbol = Symbol.for("SignUpUseCase")