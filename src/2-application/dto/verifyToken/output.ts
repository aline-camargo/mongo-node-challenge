import { IError } from "#domain/error/iErrors";

export interface OutputVerifyToken {
  success: boolean
  result: string | IError
}