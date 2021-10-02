import { ErrorMessages } from '#domain/error/errorMessages'
import { IError, IErrors } from '#domain/error/iErrors'
import { StatusCodes } from 'http-status-codes'
import { injectable } from 'inversify'

@injectable()
export class Errors implements IErrors {
  getInternalError (): IError {
    return {
      message: ErrorMessages.INTERNAL_ERROR_MESSAGE,
      code: StatusCodes.INTERNAL_SERVER_ERROR
    }
  }

  getValidationError (): IError {
    return {
      message: ErrorMessages.VALIDATION_ERROR_MESSAGE,
      code: StatusCodes.BAD_REQUEST
    }
  }

  getInvalidEmailError (): IError {
    return {
      message: ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE,
      code: StatusCodes.CONFLICT
    }
  }

  getInvalidSignInError (): IError {
    return {
      message: ErrorMessages.INVALID_SIGN_IN_ERROR_MESSAGE,
      code: StatusCodes.UNAUTHORIZED
    }
  }

  getUnauthorizedError (): IError {
    return {
      message: ErrorMessages.UNAUTHORIZED_ERROR_MESSAGE,
      code: StatusCodes.UNAUTHORIZED
    }
  }
}
