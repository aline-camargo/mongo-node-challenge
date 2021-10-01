export const ITokenServiceSymbol = Symbol.for("ITokenService")

export interface ITokenService {
  generateToken (id: string, name: string, email: string) : Promise<string>
  validateToken (plaintextPassword: string, hash: string) : Promise<boolean>
}