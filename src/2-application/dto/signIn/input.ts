import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ValidatableInput } from '#application/dto/validableInput'

export class InputSignIn extends ValidatableInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  senha!: string

  constructor (obj: Partial<InputSignIn>) {
    super()
    Object.assign(this, obj)
  }
}

