export const IErrorsSymbol = Symbol.for('IErrors')

export interface IErrors {
  getInternalError() : IError
  getValidationError() : IError
  getInvalidEmailError() : IError
  getInvalidSignInError() : IError
  getUnauthorizedError() : IError
}

export interface IError {
  message: string
  code: number
}
