import { config } from './config'
import { CryptoHash } from './CryptoHash'
import { GenericBlockError } from './Errors/GenericBlockError'

class Block {
  constructor({ data, difficulty, hash, lastHash, nonce, timestamp }) {
    this.data = data
    this.difficulty = difficulty
    this.hash = hash
    this.lastHash = lastHash
    this.nonce = nonce
    this.timestamp = timestamp
  }

  static validate({ data, difficulty, hash, lastHash, nonce, timestamp }) {
    if (!data)
      throw GenericBlockError.create(
        `[Block.validate] data(${data})
          difficulty(${difficulty})
          hash(${hash})
          lastHash(${lastHash})
          nonce(${nonce})
          timestamp(${timestamp})`,
      )
  }

  static create({ data, difficulty, hash, lastHash, nonce, timestamp }) {
    Block.validate({ data, difficulty, hash, lastHash, nonce, timestamp })
    return new Block({ data, difficulty, hash, lastHash, nonce, timestamp })
  }

  static genesis() {
    this._config = config
    const { data, difficulty, hash, lastHash, nonce, timestamp } = this._config.GENESIS_BLOCK

    return Block.create({ data, difficulty, hash, lastHash, nonce, timestamp })
  }

  static mineBlock({ lastBlock, data }) {
    let nonce = 0
    let timestamp
    const { difficulty } = lastBlock
    const lastHash = lastBlock.hash

    const currentDifficulty = '0'.repeat(difficulty)
    let hash

    do {
      nonce++
      timestamp = Date.now()
      hash = CryptoHash(data, lastHash, timestamp, nonce, difficulty)
      console.log('HASH', hash)
    } while (!hash.startsWith(currentDifficulty))

    return Block.create({
      data,
      difficulty,
      hash,
      lastHash,
      nonce,
      timestamp,
    })
  }
}

export { Block }
