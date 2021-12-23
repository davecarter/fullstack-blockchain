import { Block } from './Block'
import { CryptoHash } from './CryptoHash'

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

  replaceChain(chain) {
    if (chain.length <= this._chain.length) {
      console.warn('BlockChain length must be longer')
      return
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error('BlockChain must be valid')
      return
    }

    console.log('Replacing BlockChain')
    this._chain = chain
  }

  static isValidChain(blockchain) {
    // genesis block validation
    if (JSON.stringify(blockchain[0]) !== JSON.stringify(Block.genesis())) return false

    // rest of the blockchain validation
    for (let i = 1; i < blockchain.length; i++) {
      const { data, hash, lastHash, timestamp, nonce, difficulty } = blockchain[i]
      const actualLastHash = blockchain[i - 1].hash
      if (lastHash !== actualLastHash) return false

      const validatedHash = CryptoHash(data, lastHash, timestamp, nonce, difficulty)
      if (hash !== validatedHash) return false
    }

    return true
  }
}
