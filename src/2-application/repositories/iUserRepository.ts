import { User } from '#domain/entities/user'

export const IUserRepositorySymbol = Symbol.for('IUserRepository')

export interface IUserRepository {
  create (user: User) : Promise<User>
  updateToken (id: string, token: string) : Promise<User>
  findByEmail (email: string) : Promise<User | null>
}
