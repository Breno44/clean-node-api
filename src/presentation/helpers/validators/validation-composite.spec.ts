import { MissingParamError } from '../../errors'
import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('should be return error if validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }

    const sut = new ValidationComposite([new ValidationStub()])

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError('field'))
  })
})
