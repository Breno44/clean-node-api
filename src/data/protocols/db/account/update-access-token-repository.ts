import type { ObjectId } from 'mongodb'

export interface UpdateAccessTokenModel {
  id: ObjectId
  accessToken: string
}

export interface UpdateAccessTokenRepository {
  updateAccessToken: (values: UpdateAccessTokenModel) => Promise<void>
}
