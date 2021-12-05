import { cryptoHash } from '../FES/CryptoHash'
import hashed from './fixtures/crypto.json'

describe('Adds SHA256 encryption', () => {
  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('Hello crypto World!')).toEqual(hashed.hash)
  })
})
