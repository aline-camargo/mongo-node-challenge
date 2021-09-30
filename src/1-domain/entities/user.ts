export interface User {
  _id?: string
  nome: string
  email: string
  senha: string
  telefones: Telefone[]
  data_criacao?: Date
  data_atualizacao?: Date
  ultimo_login?: Date
  token?: string
}

export interface Telefone {
  numero: number
  ddd: number
}
