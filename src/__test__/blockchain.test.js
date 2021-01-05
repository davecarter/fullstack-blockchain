import { Blockchain } from "../FES/Blockchain"
import { Block } from "../FES/Block"

describe("a Blockchain is succesfully build", () => {
  let blockchain = new Blockchain()

  beforeEach(() => {
    blockchain = new Blockchain()
  })

  it("contains a `chain` array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true)
  })

  it("starts with the genesis Block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis())
  })

  it("adds a new block to the blockchain", () => {
    const data = "new block data"
    blockchain.addBlock({ data })

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data)
  })

  describe("Is a valid chain", () => {
    describe("when the chain does not starts with a Genesis block", () => {
      it("should return false", () => {
        blockchain.chain[0] = { data: "invalid genesis block" }
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
      })
    })

    describe("when the chain starts with a Genesis block and has multiple Blocks", () => {
      describe("and a lastHash reference has changed", () => {
        it("should return false", () => {
          blockchain.addBlock({ data: "one" })
          blockchain.addBlock({ data: "two" })
          blockchain.addBlock({ data: "three" })

          blockchain.chain[2].lastHash = "broken-lastHash"
        })
      })

      describe("and the chain contains a block with an invalid field", () => {
        it("should return false", () => {
          blockchain.addBlock({ data: "one" })
          blockchain.addBlock({ data: "two" })
          blockchain.addBlock({ data: "three" })

          blockchain.chain[2].data = "broken-data"

          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })
      })

      describe("and the chain does not contains any invalid Blocks", () => {
        it("should return true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
        })
      })
    })
  })
})
