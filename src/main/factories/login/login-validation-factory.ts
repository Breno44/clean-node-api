import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export function makeLoginValidation (): ValidationComposite {
  const requiredFields = new RequiredFieldValidation(['email', 'password'])
  const emailValidation = new EmailValidation('email', new EmailValidatorAdapter())

  return new ValidationComposite([requiredFields, emailValidation])
}
