import { MissingParamError } from '../../errors'
import { type Validation } from '../../protocols'

export class RequiredFieldValidation implements Validation {
  private readonly fields: string[]

  constructor (fields: string[]) {
    this.fields = fields
  }

  validate (input: any): Error {
    for (const field of this.fields) {
      if (!input[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
