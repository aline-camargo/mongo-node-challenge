import { validateSync } from "class-validator"
export class ValidatableInput {
  validate () : { isValid: boolean, errorsList: string} {
    const errors = this.errors()

    const isValid = !(errors && errors.length > 0)
    const result = {
      isValid,
      errorsList: ''
    }

    if (!isValid) {
      result.errorsList = errors.map((error) => {
        return error.property
      }).join(",")
    }
    return result
  }

  errors () {
    return validateSync(this)
  }
}