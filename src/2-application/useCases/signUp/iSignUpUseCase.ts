import { InputUser } from '#application/dto/user/input'
import { OutputUser } from '#application/dto/user/output'

export const ISignUpUseCaseSymbol = Symbol.for('ISignUpUseCase')

export interface ISignUpUseCase {
  run (input: InputUser) : Promise<OutputUser>
}
