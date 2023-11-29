import { type LogErrorRepository } from '../../data/protocols/log-error-repository'
import { type AccountModel } from '../../domain/models/account'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { type HttpResponse, type Controller, type HttpRequest } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {}
  }

  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(ok(makeFakeAccount()))
    }
  }

  return new ControllerStub()
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: '123456789',
      passwordConfirmation: '123456789'
    }
  }
)

const makeFakeAccount: () => AccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const logErrorStub = makeLogErrorRepository()
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub, logErrorStub)

  return {
    sut,
    controllerStub,
    logErrorStub
  }
}

describe('LogController Decorator', () => {
  it('should call controller handle', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  it('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(ok(makeFakeAccount()))
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorStub } = makeSut()

    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(async (): Promise<HttpResponse> => {
      return await Promise.resolve(makeServerError())
    })
    const logSpy = jest.spyOn(logErrorStub, 'log')
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
