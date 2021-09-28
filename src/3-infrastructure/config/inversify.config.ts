import { IUserRepository, IUserRepositorySymbol } from "#application/repositories/iUserRepository"
import UserRepository from "#infrastructure/repositories/userRepository"
import { Container } from "inversify"

const container = new Container()

container.bind<IUserRepository>(IUserRepositorySymbol).to(UserRepository)

export { container }