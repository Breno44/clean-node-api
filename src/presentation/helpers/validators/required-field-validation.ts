import { MissingParamError } from '../../errors'
import { type Validation } from '../../protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fields: string[]) {}

  validate (input: any): Error {
    for (const field of this.fields) {
      if (!input[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
