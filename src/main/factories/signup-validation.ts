import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export function makeSignUpValidation (): ValidationComposite {
  const requiredFields = new RequiredFieldValidation(['name', 'email', 'password', 'passwordConfirmation'])
  const compareFields = new CompareFieldValidation('password', 'passwordConfirmation')

  return new ValidationComposite([
    requiredFields,
    compareFields
  ])
}
