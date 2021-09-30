import { InputUser } from '#application/dto/inputUser'
import { User } from '#domain/entities/user'

export const ISignUpUseCaseSymbol = Symbol.for('ISignUpUseCase')

export interface ISignUpUseCase {

  // TODO: Fix output
  run (input: InputUser) : Promise<User>
}
