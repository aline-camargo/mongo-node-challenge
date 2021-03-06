import { IError } from '#domain/error/iErrors'

export interface UserResult {
  id?: string
  nome: string
  email: string
  senha: string
  telefones: Telefone[]
  data_criacao?: Date
  data_atualizacao?: Date
  ultimo_login?: Date
  token?: string
}

interface Telefone {
  numero: number
  ddd: number
}

export interface OutputUser {
  result: UserResult | IError
  success: boolean
}
