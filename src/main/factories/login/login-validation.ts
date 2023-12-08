import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export function makeLoginValidation (): ValidationComposite {
  const requiredFields = new RequiredFieldValidation(['email', 'password'])
  const emailValidation = new EmailValidation('email', new EmailValidatorAdapter())

  return new ValidationComposite([requiredFields, emailValidation])
}
