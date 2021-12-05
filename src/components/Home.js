import React from 'react'
import { Block } from './Block'
import { config } from '../FES/config/index'

const HomePage = () => (
  <header className="homePage-Header">
    <h1 className="homePage-HeaderTitle">Fullstack Blockchain based project</h1>
    <Block data={config.GENESIS_BLOCK.data} />
    <a className="homePage-HeaderAuthor" title="developed by David G" href="https://twitter.com/@d4vecarter">
      @d4vecarter
    </a>
  </header>
)

export { HomePage }
