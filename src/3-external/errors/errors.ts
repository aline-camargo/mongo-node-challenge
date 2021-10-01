import { internalErrorMessage, invalidEmailErrorMessage, validationErrorMessage } from "#domain/error/errorMessages";
import { IError, IErrors } from "#domain/error/iErrors";
import { StatusCodes } from "http-status-codes";
import { injectable } from "inversify";

@injectable()
export class Errors implements IErrors {
  getInternalError(): IError {
    return {
      message: internalErrorMessage,
      code: StatusCodes.INTERNAL_SERVER_ERROR
    }
  }

  getValidationError(): IError {
    return {
      message: validationErrorMessage,
      code: StatusCodes.BAD_REQUEST
    }
  }

  getInvalidEmailError(): IError {
    return {
      message: invalidEmailErrorMessage,
      code: StatusCodes.CONFLICT
    }
  }

}
