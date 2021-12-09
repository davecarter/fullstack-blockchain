import { Blockchain } from '../FES/Blockchain.js'
import { Block } from '../FES/Block.js'

describe('Blockchain', () => {
  let blockchain, newChain, originalChain

  beforeEach(() => {
    blockchain = new Blockchain()
    newChain = new Blockchain()

    originalChain = blockchain._chain
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

  describe('Replace chain', () => {
    let warnMock, errorMock, logMock

    beforeEach(() => {
      warnMock = jest.spyOn(console, 'warn').mockImplementation()
      errorMock = jest.spyOn(console, 'error').mockImplementation()
      logMock = jest.spyOn(console, 'log').mockImplementation()
    })

    describe('When the new chain is not longer', () => {
      beforeEach(() => {
        // modify the new chain to make it different from the original copy
        newChain._chain[0] = { new: 'chain' }
        blockchain.replaceChain(newChain._chain)
      })

      it('does not replace the chain', () => {
        expect(blockchain._chain).toEqual(originalChain)
      })

      it('Logs a warning', () => {
        expect(warnMock).toHaveBeenCalled()
      })
    })

    describe('When the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Bears' })
        newChain.addBlock({ data: 'Beets' })
        newChain.addBlock({ data: 'Battlestar Galactica' })
      })

      describe('and the chain is invalid', () => {
        beforeEach(() => {
          // hash corruption to invalidate the newChain
          newChain._chain[2].hash = 'some fake hash'
          // replaceChain should not swap blockchains
          blockchain.replaceChain(newChain._chain)
        })

        it('does not replace the chain', () => {
          expect(blockchain._chain).toEqual(originalChain)
        })

        it('Logs an error', () => {
          expect(errorMock).toHaveBeenCalled()
        })
      })

      describe('and the chain is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain._chain)
        })

        it('replaces the chain', () => {
          expect(blockchain._chain).toEqual(newChain._chain)
        })

        it('Logs about chain replacement', () => {
          expect(logMock).toHaveBeenCalled()
        })
      })
    })
  })
})
