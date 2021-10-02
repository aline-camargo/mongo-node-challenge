import { OutputVerifyToken } from '#application/dto/verifyToken/output'

export const IVerifyTokenUseCaseSymbol = Symbol.for('IVerifyTokenUseCase')

export interface IVerifyTokenUseCase {
  run(token?: string) : Promise<OutputVerifyToken>
}
