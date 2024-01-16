import { CompareFieldValidation, ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export function makeSignUpValidation (): ValidationComposite {
  const requiredFields = new RequiredFieldValidation(['name', 'email', 'password', 'passwordConfirmation'])
  const compareFields = new CompareFieldValidation('password', 'passwordConfirmation')
  const emailValidation = new EmailValidation('email', new EmailValidatorAdapter())

  return new ValidationComposite([
    requiredFields,
    compareFields,
    emailValidation
  ])
}
