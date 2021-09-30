import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class InputUser {
  @IsNotEmpty()
  @IsString()
  nome!: string

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  senha!: string

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Telefones)
  telefones!: Telefones[]

  constructor (obj: Partial<InputUser>) {
    Object.assign(this, obj)
  }
}

// TODO : Validar cada item
class Telefones {
  @IsNotEmpty()
  @IsNumber()
  numero!: number

  @IsNotEmpty()
  @IsNumber()
  ddd!: number
}
