export interface UpdateAccessTokenModel {
  id: string
  accessToken: string
}

export interface UpdateAccessTokenRepository {
  updateAccessToken: (values: UpdateAccessTokenModel) => Promise<void>
}
