import { InputUser } from '#application/dto/inputUser'
import { OutputUser } from '#application/dto/outputUser'

export const ISignUpUseCaseSymbol = Symbol.for('ISignUpUseCase')

export interface ISignUpUseCase {
  run (input: InputUser) : Promise<OutputUser>
}
