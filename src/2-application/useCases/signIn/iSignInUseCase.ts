import { InputSignIn } from '#application/dto/signIn/input'
import { OutputUser } from '#application/dto/user/output'

export const ISignInUseCaseSymbol = Symbol.for('ISignInUseCase')

export interface ISignInUseCase {
  run (input: InputSignIn) : Promise<OutputUser>
}
