import jwt from 'jsonwebtoken'
import { injectable } from 'inversify'
import { ITokenService } from '#application/services/iTokenService'

@injectable()
export class TokenService implements ITokenService {
  private readonly privateKey = process.env.JWT_PRIVATE_KEY || 'secret'

  async generateToken (id: string, name: string, email: string) : Promise<string> {
    return jwt.sign({ id, name, email }, this.privateKey)
  }

  validateToken (token: string) : { success: boolean, id: string } {
    try {
      const verifiedToken = jwt.verify(token, this.privateKey) as { id: string }
      return {
        ...verifiedToken,
        success: true
      }
    } catch (e) {
      console.log('JWT validation error')
      return { success: false, id: '' }
    }
  }
}
