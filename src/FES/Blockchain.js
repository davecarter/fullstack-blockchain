import { Block } from "./Block"
import { cryptoHash } from "./cryptoHash"

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock({ data }) {
    const minedBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    })

    this.chain.push(minedBlock)
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false
    }

    for (let i = 1; i < chain.length; i++) {
      const { data, difficulty, hash, lastHash, timestamp } = chain[i - 1]
      const actualHash = chain[i - 1].hash

      if (lastHash !== actualHash) return false

      const validateHash = cryptoHash(data, difficulty, lastHash, timestamp)

      if (hash !== validateHash) return false
    }
    return true
  }
}

export { Blockchain }
