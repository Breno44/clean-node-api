import { type AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

export interface LoadAccountByEmailRepository {
  find: (email: string) => Promise<AccountModel>
}

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepo with correct email', async () => {
    class LoadAccountByEmailRepo implements LoadAccountByEmailRepository {
      async find (email: string): Promise<AccountModel> {
        return {
          email: '',
          id: '',
          name: '',
          password: ''
        }
      }
    }
    const loadAccountByEmailRepo = new LoadAccountByEmailRepo()
    const sut = new DbAuthentication(loadAccountByEmailRepo)
    const findSpy = jest.spyOn(loadAccountByEmailRepo, 'find')

    await sut.auth({ email: 'any_email@mail.com', password: '' })

    expect(findSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
