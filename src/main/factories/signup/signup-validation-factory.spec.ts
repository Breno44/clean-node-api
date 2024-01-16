import { CompareFieldValidation, ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { makeSignUpValidation } from './signup-validation--factory'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation(['name', 'email', 'password', 'passwordConfirmation']),
      new CompareFieldValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', new EmailValidatorAdapter())
    ])
  })
})
