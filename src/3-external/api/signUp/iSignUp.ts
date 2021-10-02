import { OutputUser } from '#application/dto/user/output'
import { Request } from 'express'

export const ISignUpSymbol = Symbol.for('ISignUp')

export interface ISignUp {
  run (request: Request) : Promise<OutputUser>
}
