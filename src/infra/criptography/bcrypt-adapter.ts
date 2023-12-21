import bcrypt from 'bcrypt'
import { type Hasher } from '../../data/protocols/criptography/hasher'
import type { HashComparer, HashComparerParams } from '../../data/protocols/criptography/hash-compare'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  };

  async compare ({ value, hash }: HashComparerParams): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
