export const IHashServiceSymbol = Symbol.for('IHashService')

export interface IHashService {
  generateHash (plaintextPassword: string) : Promise<string>
  compareHash (plaintextPassword: string, hash: string) : Promise<boolean>
}
