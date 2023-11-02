import { MissingParamName } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamName('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamName('email'))
    }
  }
}
