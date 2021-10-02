import { OutputUser } from "#application/dto/user/output";
import { Request } from "express";

export const IGetUserSymbol = Symbol.for('IGetUser')

export interface IGetUser {
  run(request: Request) : Promise<OutputUser>
}