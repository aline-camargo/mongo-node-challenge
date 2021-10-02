import { OutputUser } from '#application/dto/user/output'

export const IGetUserUseCaseSymbol = Symbol.for('IGetUserUseCase')

export interface IGetUserUseCase {
  run (userId: string) : Promise<OutputUser>
}
