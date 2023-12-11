import { type AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

export interface LoadAccountByEmailRepository {
  find: (email: string) => Promise<AccountModel>
}

const makeLoadAccount = (): LoadAccountByEmailRepository => {
  class LoadAccount implements LoadAccountByEmailRepository {
    async find (email: string): Promise<AccountModel> {
      return {
        email: '',
        id: '',
        name: '',
        password: ''
      }
    }
  }

  return new LoadAccount()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccount: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccount = makeLoadAccount()
  const sut = new DbAuthentication(loadAccount)

  return {
    sut,
    loadAccount
  }
}

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepo with correct email', async () => {
    const { sut, loadAccount } = makeSut()
    const findSpy = jest.spyOn(loadAccount, 'find')

    await sut.auth({ email: 'any_email@mail.com', password: '' })

    expect(findSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
