import { config } from './config'
import { cryptoHash } from './CryptoHash'

class Block {
  constructor({ data, hash, lastHash, timestamp }) {
    this.data = data
    this.hash = hash
    this.lastHash = lastHash
    this.timestamp = timestamp
  }

  static genesis() {
    this._config = config
    const { data, hash, lastHash, timestamp } = this._config.GENESIS_BLOCK

    return new this({ data, hash, lastHash, timestamp })
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash

    return new this({
      data,
      hash: cryptoHash(data, lastHash, timestamp),
      lastHash,
      timestamp,
    })
  }
}

export { Block }
