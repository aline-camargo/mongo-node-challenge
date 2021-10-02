import jwt from 'jsonwebtoken'
import { injectable } from 'inversify'
import { ITokenService } from '#application/services/iTokenService'

@injectable()
export class TokenService implements ITokenService {
  private readonly privateKey = '17630c07-0e11-4ef9-a22b-6b0419accb9a'

  async generateToken (id: string, name: string, email: string) : Promise<string> {
    return jwt.sign({ id, name, email }, this.privateKey, { expiresIn: '30m' })
  }

  async validateToken (plaintextPassword: string, hash: string) : Promise<boolean> {
    console.log(plaintextPassword, hash)
    return true
  }
}
