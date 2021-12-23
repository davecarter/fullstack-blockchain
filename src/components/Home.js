import React, { useEffect, useState } from 'react'
import { BlockComponent } from './BlockComponent'
import { Block } from '../FES'
import { Blockchain } from '../FES/Blockchain'

const HomePage = () => {
  const [blockData, setBlockData] = useState()
  const [inputValue, setInputValue] = useState('Insert data')
  const [currentChain, setCurrentChain] = useState([])
  let blockchain
  blockchain = new Blockchain()

  const lastBlock = Block.genesis()
  useEffect(() => {
    setBlockData(Block.mineBlock({ lastBlock, data: inputValue }))
    setCurrentChain([blockchain._chain])
  }, [])

  const handleChange = evt => setInputValue(evt.target.value)
  const handleClick = () => {
    setBlockData(Block.mineBlock({ lastBlock, data: inputValue }))
    setCurrentChain(blockchain.addBlock({ data: blockData }))
  }
  console.log(blockData)
  return (
    <header className="homePage-Header">
      <h1 className="homePage-HeaderTitle">Fullstack Blockchain based project</h1>
      <p>
        Data: <input value={inputValue || ''} type="text" onChange={handleChange} />
        <button onClick={handleClick}>Mine block</button>
      </p>
      {currentChain?.map(blockData => (
        <BlockComponent blockData={blockData} />
      ))}
      <a className="homePage-HeaderAuthor" title="developed by David G" href="https://twitter.com/@d4vecarter">
        @d4vecarter
      </a>
    </header>
  )
}

export { HomePage }
