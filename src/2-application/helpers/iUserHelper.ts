import { UserResult } from '#application/dto/user/output'
import { User } from '#domain/entities/user'

export const IUserHelperSymbol = Symbol.for('IUserHelper')

export interface IUserHelper {
  userToUserResult(user: User) : UserResult
}
