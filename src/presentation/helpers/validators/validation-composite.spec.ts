import { MissingParamError } from '../../errors'
import { type Validation } from '../../protocols'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  validationStubs: Validation[]
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)

  return {
    validationStubs,
    sut
  }
}

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new Error())
  })

  it('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const response = sut.validate({ name: 'any_name' })

    expect(response).toBeFalsy()
  })
})
