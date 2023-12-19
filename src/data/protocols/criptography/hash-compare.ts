export interface HashComparerParams {
  value: string
  hash: string
}

export interface HashComparer {
  compare: (values: HashComparerParams) => Promise<boolean>
}
