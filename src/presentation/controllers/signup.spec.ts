import { MissingParamName } from '../errors/missing-param-error'
import { SignUpController } from './signup'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  it('should be return status code 400 if name is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: '123456789',
        passwordConfirmation: '123456789'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('name'))
  })

  it('should be return status code 400 if emil is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: '123456789',
        passwordConfirmation: '123456789'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('email'))
  })

  it('should be return status code 400 if password is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        passwordConfirmation: '123456789'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('password'))
  })

  it('should be return status code 400 if passwordConfirmation is not provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: '123456789'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamName('passwordConfirmation'))
  })
})
