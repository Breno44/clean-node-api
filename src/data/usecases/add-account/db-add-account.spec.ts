import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount test', () => {
  it('should be call encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (password: string): Promise<string> {
        return await Promise.resolve('hashed_password')
      }
    }

    const encrypterStub = new EncrypterStub()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const sut = new DbAddAccount(encrypterStub)

    const fakeAccount = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(fakeAccount)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
