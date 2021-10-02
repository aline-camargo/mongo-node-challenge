import { OutputVerifyToken } from '#application/dto/verifyToken/output'
import { Request } from 'express'

export const IVerifyTokenSymbol = Symbol.for('IVerifyToken')

export interface IVerifyToken {
  run (request: Request) : Promise<OutputVerifyToken>
}
