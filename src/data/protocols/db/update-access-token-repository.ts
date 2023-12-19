export interface UpdateAccessTokenModel {
  id: string
  accessToken: string
}

export interface UpdateAccessTokenRepository {
  update: (values: UpdateAccessTokenModel) => Promise<void>
}
