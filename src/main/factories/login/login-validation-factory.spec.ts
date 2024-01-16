import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation(['email', 'password']),
      new EmailValidation('email', new EmailValidatorAdapter())
    ])
  })
})
