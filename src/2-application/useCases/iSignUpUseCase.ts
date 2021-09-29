export const ISignUpUseCaseSymbol = Symbol.for("ISignUpUseCase")

export interface ISignUpUseCase {
  run () : void
}