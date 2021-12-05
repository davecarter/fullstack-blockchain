import { Block } from '../FES'
import { cryptoHash } from '../FES/CryptoHash'

describe('Creates the Genesis Block', () => {
  const data = 'This is the GENESIS block'
  const hash = '0000000000'
  const lastHash = '0000000000'

  const genesisBlock = Block.genesis()

  it('returns a Block instance', () => {
    expect(genesisBlock instanceof Block).toBe(true)
  })

  it('builds a Block containing data, hash, lastHash and timestamp properties', () => {
    expect(genesisBlock.data).toEqual(data)
    expect(genesisBlock.hash).toEqual(hash)
    expect(genesisBlock.lastHash).toEqual(lastHash)
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
    expect(minedBlock.hash).toEqual(cryptoHash(data, hash, minedBlock.timestamp))
  })
})
