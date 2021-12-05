import { Block } from './Block'
import { cryptoHash } from './CryptoHash'

export class Blockchain {
  constructor() {
    this._chain = [Block.genesis()]
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this._chain[this._chain.length - 1],
      data,
    })

    this._chain.push(newBlock)
  }

  static isValidChain(blockchain) {
    // genesis block validation
    if (JSON.stringify(blockchain[0]) !== JSON.stringify(Block.genesis())) return false

    // rest of the blockchain validation
    for (let i = 1; i < blockchain.length; i++) {
      const { data, hash, lastHash, timestamp } = blockchain[i]
      const actualLastHash = blockchain[i - 1].hash
      if (lastHash !== actualLastHash) return false

      const validatedHash = cryptoHash(data, lastHash, timestamp)
      if (hash !== validatedHash) return false
    }

    return true
  }
}
