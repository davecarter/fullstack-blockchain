import { Blockchain } from '../FES/Blockchain.js'
import { Block } from '../FES/Block.js'

describe('Blockchain', () => {
  let blockchain

  beforeEach(() => {
    blockchain = new Blockchain()
  })

  it('Contains a chain Array instance', () => {
    expect(blockchain._chain instanceof Array).toBe(true)
  })

  it('Starts with the Genesis Block', () => {
    expect(blockchain._chain[0]).toEqual(Block.genesis())
  })

  it('Adds a new block to the chain', () => {
    const newData = 'new block data'
    blockchain.addBlock({ data: newData })

    expect(blockchain._chain[blockchain._chain.length - 1].data).toEqual(newData)
  })

  describe('isValidChain()', () => {
    describe('When the chain does not starts with the Genesis Block', () => {
      it('Returns false', () => {
        blockchain._chain[0] = { data: 'fake genesis block' }
        expect(Blockchain.isValidChain(blockchain._chain)).toBe(false)
      })
    })

    describe('When the chain starts with the Genesis Block and has multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'Bears' })
        blockchain.addBlock({ data: 'Beets' })
        blockchain.addBlock({ data: 'Battlestar Galactica' })
      })

      describe('and lastHash reference has changed', () => {
        it('returns false', () => {
          blockchain._chain[2].lastHash = 'tampered hash'
          expect(Blockchain.isValidChain(blockchain._chain)).toBe(false)
        })
      })

      describe('and the chain contains a block with an invalid field', () => {
        it('returns false', () => {
          blockchain._chain[2].data = 'tampered data'
          expect(Blockchain.isValidChain(blockchain._chain)).toBe(false)
        })
      })

      describe('and the chain does not contains an invalid block', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain._chain)).toBe(true)
        })
      })
    })
  })
})
