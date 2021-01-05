import { Blockchain } from "../FES/Blockchain"
import { Block } from "../FES/Block"

describe("a Blockchain is succesfully build", () => {
  const blockchain = new Blockchain()

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
})
