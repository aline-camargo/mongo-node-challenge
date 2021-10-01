import { IHashService } from '#application/services/iHashService';
import bcrypt from 'bcrypt'
import { injectable } from 'inversify'

@injectable()
export class HashService implements IHashService {
  private readonly saltRounds = 10;

  async generateHash (plaintextPassword: string) : Promise<string> {
    return bcrypt.hash(plaintextPassword, this.saltRounds)
  }

  async compareHash (plaintextPassword: string, hash: string) : Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hash)
  }
}
