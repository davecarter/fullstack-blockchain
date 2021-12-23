import { Block } from '../FES'
import { CryptoHash } from '../FES/CryptoHash'

describe('Block', () => {
  const data = 'this is the block data'
  const difficulty = 1
  const hash = 'hash'
  const lastHash = 'last-hash'
  const nonce = 1
  const timestamp = Date.now()
  const block = new Block({ timestamp, lastHash, hash, data, nonce, difficulty })

  it('has a timestamp, lasthash, hash, data, nonce and difficulty', () => {
    expect(block.data).toEqual(data)
    expect(block.difficulty).toEqual(difficulty)
    expect(block.hash).toEqual(hash)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.nonce).toEqual(nonce)
  })
})

describe('Creates the Genesis Block', () => {
  const data = 'This is the GENESIS block'
  const hash = '0000000000'
  const lastHash = '0000000000'
  const nonce = 1
  const timestamp = Date.now()

  const genesisBlock = Block.genesis()

  it('returns a Block instance', () => {
    expect(genesisBlock instanceof Block).toBe(true)
  })

  it('builds a Block containing data, hash, lastHash and timestamp properties', () => {
    expect(genesisBlock.data).toEqual(data)
    expect(genesisBlock.hash).toEqual(hash)
    expect(genesisBlock.lastHash).toEqual(lastHash)
    expect(genesisBlock.nonce).toEqual(nonce)
  })
})

describe('Mines a Block', () => {
  const lastBlock = Block.genesis()
  const data = 'Initial mined data'
  const minedBlock = Block.mineBlock({ lastBlock, data })

  it('returns a Block instance', () => {
    expect(minedBlock instanceof Block).toBe(true)
  })

  it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash)
  })

  it('sets the data into the Block', () => {
    expect(minedBlock.data).toEqual(data)
  })

  it('sets a timestamp', () => {
    expect(minedBlock.timestamp).not.toEqual(undefined)
  })

  it('creates a SHA-256 `hash` based on the proper inputs', () => {
    const { hash } = lastBlock
    expect(minedBlock.hash).toEqual(
      CryptoHash(data, hash, minedBlock.timestamp, minedBlock.nonce, minedBlock.difficulty),
    )
  })

  it('sets a hash that matches the difficulty criteria', () => {
    expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty))
  })
})
