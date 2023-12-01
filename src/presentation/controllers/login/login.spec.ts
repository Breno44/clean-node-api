import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { type HttpRequest, type EmailValidator } from '../signup/signup-protocols'
import { LoginController } from './login'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()

    const fakeRequest = {
      body: {
        password: 'any_password'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 if password is not provided', async () => {
    const { sut } = makeSut()

    const fakeRequest = {
      body: {
        email: 'any_email'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeFakeRequest())

    expect(isValidSpy).toHaveBeenCalledWith('any_email')
  })

  it('should return 400 if email is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const response = await sut.handle(makeFakeRequest())

    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const fakeError = new Error()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw fakeError
    })

    const response = await sut.handle(makeFakeRequest())

    expect(response).toEqual(serverError(fakeError))
  })
})
