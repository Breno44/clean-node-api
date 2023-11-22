import request from 'supertest'
import app from '../config/app'

describe('SignUp routes', () => {
  it('should return an account on success', async () => {
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
