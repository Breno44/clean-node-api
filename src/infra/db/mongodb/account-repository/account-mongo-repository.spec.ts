import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = (): AddAccountRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  it('should return an account on success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@mail.com')
    expect(account.password).toBe('valid_password')
  })
})
