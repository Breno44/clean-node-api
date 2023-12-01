import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { type EmailValidator } from '../signup/signup-protocols'
import { LoginController } from './login'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

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
  it('should be return 400 if email is not provided', async () => {
    const { sut } = makeSut()

    const fakeRequest = {
      body: {
        password: 'any_password'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should be return 400 if password is not provided', async () => {
    const { sut } = makeSut()

    const fakeRequest = {
      body: {
        email: 'any_email'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should be call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const fakeRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(fakeRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_email')
  })

  it('should be return 400 if email is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const fakeRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })
})
