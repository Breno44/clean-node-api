import { InvalidParamError } from '../../errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldConfirmation')
}

describe('CompareField Validation', () => {
  it('should be return an InvalidParamError if fields are distinct', () => {
    const sut = makeSut()

    const error = sut.validate({ field: '123456789', fieldConfirmation: '12345678' })

    expect(error).toEqual(new InvalidParamError('fieldConfirmation'))
  })

  it('should be return undefined if values are equal', () => {
    const sut = makeSut()

    const response = sut.validate({ field: '12345678', fieldConfirmation: '12345678' })

    expect(response).toEqual(undefined)
  })
})
