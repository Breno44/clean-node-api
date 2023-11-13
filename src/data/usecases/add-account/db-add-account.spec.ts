import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeSut = (): any => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  const encrypterStub = new EncrypterStub()

  const sut = new DbAddAccount(encrypterStub)

  return {
    encrypterStub,
    sut
  }
}

describe('DbAddAccount test', () => {
  it('should be call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const fakeAccount = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(fakeAccount)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
