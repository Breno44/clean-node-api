import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(['field'])
}

describe('RequiredField Validation', () => {
  it('should be return a MissingParamError if field is not provided', () => {
    const sut = makeSut()

    const error = sut.validate({})

    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should be return undefined if all values are provided', () => {
    const sut = makeSut()

    const response = sut.validate({ field: 'any_field' })

    expect(response).toEqual(undefined)
  })
})
