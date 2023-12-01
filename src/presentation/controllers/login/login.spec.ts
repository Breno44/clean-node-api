import type { HttpRequest, EmailValidator, Authentication } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { LoginController } from './login'

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

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
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(emailValidatorStub, authenticationStub)

  return {
    sut,
    emailValidatorStub,
    authenticationStub
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

  it('should call Authenticator with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeRequest())

    expect(authSpy).toHaveBeenCalledWith('any_email', 'any_password')
  })

  it('should return 401 if invalid credential are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(unauthorized())
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    const fakeError = new Error()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw fakeError
    })

    const response = await sut.handle(makeFakeRequest())

    expect(response).toEqual(serverError(fakeError))
  })
})
