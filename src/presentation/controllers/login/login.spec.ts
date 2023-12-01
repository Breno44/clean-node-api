import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { LoginController } from './login'

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  it('should be return 400 if email is not provided', async () => {
    const sut = makeSut()

    const fakeRequest = {
      body: {
        password: 'any_password'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should be return 400 if password is not provided', async () => {
    const sut = makeSut()

    const fakeRequest = {
      body: {
        email: 'any_email'
      }
    }

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })
})
