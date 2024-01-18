import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { hash } from 'bcrypt'

describe('Login routes', () => {
  let accountsCollection: Collection

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

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Breno',
          email: 'bhfs.2908@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('123', 12)

      await accountsCollection.insertOne({
        name: 'Breno',
        email: 'bhfs.2908@gmail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'bhfs.2908@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    it('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'bhfs.2908@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
