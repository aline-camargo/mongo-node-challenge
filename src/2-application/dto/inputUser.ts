import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ValidatableInput } from './validableInput'

export class InputUser extends ValidatableInput {
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
    super()
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
