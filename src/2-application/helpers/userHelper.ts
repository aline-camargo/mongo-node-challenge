import moment from 'moment-timezone'
import { UserResult } from '#application/dto/user/output'
import { User } from '#domain/entities/user'
import { IUserHelper } from './iUserHelper'
import { injectable } from 'inversify'

@injectable()
export class UserHelper implements IUserHelper {
  userToUserResult(user: User): UserResult {
    return {
      id: user._id,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      telefones: user.telefones,
      data_atualizacao: this.getTimeZoneDate(user.data_atualizacao),
      data_criacao: this.getTimeZoneDate(user.data_criacao),
      ultimo_login: this.getTimeZoneDate(user.ultimo_login),
      token: user.token
    }
  }

  private getTimeZoneDate (date?: Date) {
    return moment.tz(date, 'America/Sao_Paulo').utc(true).toDate()
  }
}