import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account-mongo-repository'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log-mongo-repository'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { type Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const emailValidatorAdapter = new EmailValidatorAdapter()

  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)

  const logErrorRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logErrorRepository)
}
