import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountsCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  beforeEach(async () => {
    accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })

  it('should return an account on add success', async () => {
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

  it('should return an account on loadByEmail success', async () => {
    const sut = makeSut()

    await accountsCollection.insertOne({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    const account = await sut.loadByEmail('valid_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@mail.com')
    expect(account.password).toBe('valid_password')
  })

  it('should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  it('should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()

    const result = await accountsCollection.insertOne({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    let account = await accountsCollection.findOne(result.insertedId)

    expect(account.accessToken).toBeFalsy()

    await sut.updateAccessToken({ id: result.insertedId, accessToken: 'any_token' })

    account = await accountsCollection.findOne(result.insertedId)

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
