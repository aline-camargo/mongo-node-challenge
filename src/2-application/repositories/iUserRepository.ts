import { User } from '#domain/entities/user'

export const IUserRepositorySymbol = Symbol.for('IUserRepository')

export interface IUserRepository {
  create (user: User) : Promise<User>
}
