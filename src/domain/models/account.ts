import type { ObjectId } from 'mongodb'

export interface AccountModel {
  id: ObjectId
  name: string
  email: string
  password: string
}
