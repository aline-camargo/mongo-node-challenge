export const ITokenServiceSymbol = Symbol.for('ITokenService')

export interface ITokenService {
  generateToken (id: string, name: string, email: string, last_login?: Date) : Promise<string>
  validateToken (token: string) : { success: boolean, id: string }
}
