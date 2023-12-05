import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validation'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

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
