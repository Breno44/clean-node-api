import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export function makeSignUpValidation (): ValidationComposite {
  const requiredFields = new RequiredFieldValidation(['name', 'email', 'password', 'passwordConfirmation'])

  return new ValidationComposite([
    requiredFields
  ])
}
