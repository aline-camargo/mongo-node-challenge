import { validateSync } from "class-validator"

export class ValidatableInput {
  validate () {
    const errors = this.errors()
    if (errors && errors.length > 0) {
      throw errors
    }
  }

  errors () {
    return validateSync(this)
  }
}