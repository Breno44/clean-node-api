import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  it('should be return status code 400 if name is not provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: '123456789',
        passwordConfirmation: '123456789'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
