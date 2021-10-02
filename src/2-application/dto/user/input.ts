import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ValidatableInput } from '#application/dto/validableInput'

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
  telefones!: Telefone[]

  constructor (obj: Partial<InputUser>) {
    super()
    const telefoneList = obj.telefones ? obj.telefones : []
    const telefones = telefoneList.map((i) => {
      return new Telefone(i)
    })

    Object.assign(this, obj, { telefones })
  }

  validatePhones () : { isValid: boolean, errorsList: string } {
    const isValid = this.telefones.every(phone => {
      return phone.validate().isValid
    })

    return {
      isValid,
      errorsList: isValid ? '' : 'telefone'
    }
  }

  validate () : { isValid: boolean, errorsList: string } {
    const validate = super.validate()
    const validatePhones = this.validatePhones()

    let errorsList = ''
    if (!validate.isValid && !validatePhones.isValid) {
      errorsList = `${validate.errorsList}, ${validatePhones.errorsList}`
    } else if (!validate.isValid) {
      errorsList = validate.errorsList
    } else if (!validatePhones.isValid) {
      errorsList = validatePhones.errorsList
    }

    return {
      isValid: validate.isValid && validatePhones.isValid,
      errorsList
    }
  }
}

class Telefone extends ValidatableInput {
  @IsNotEmpty()
  @IsNumber()
  numero!: number

  @IsNotEmpty()
  @IsNumber()
  ddd!: number

  constructor (obj: Partial<Telefone>) {
    super()
    Object.assign(this, obj)
  }
}
