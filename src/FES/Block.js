import { config } from './config'
import { cryptoHash } from './CryptoHash'
import { GenericBlockError } from './Errors/GenericBlockError'

class Block {
  constructor({ data, hash, lastHash, timestamp }) {
    this.data = data
    this.hash = hash
    this.lastHash = lastHash
    this.timestamp = timestamp
  }

  static validate({ data, hash, lastHash, timestamp }) {
    if (!data || !hash || !lastHash || !timestamp)
      throw GenericBlockError.create(
        `[Block.validate] data(${data}) hash(${hash}) lastHash(${lastHash}) timestamp(${timestamp})`,
      )
  }

  static create({ data, hash, lastHash, timestamp }) {
    Block.validate({ data, hash, lastHash, timestamp })
    return new Block({ data, hash, lastHash, timestamp })
  }

  static genesis() {
    this._config = config
    const { data, hash, lastHash, timestamp } = this._config.GENESIS_BLOCK

    return Block.create({ data, hash, lastHash, timestamp })
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash

    return Block.create({
      data,
      hash: cryptoHash(data, lastHash, timestamp),
      lastHash,
      timestamp,
    })
  }
}

export { Block }
