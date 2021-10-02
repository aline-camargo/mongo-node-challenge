import { OutputUser } from '#application/dto/user/output'
import { Request } from 'express'

export const ISignInSymbol = Symbol.for('ISignIn')

export interface ISignIn {
  run (request: Request) : Promise<OutputUser>
}
