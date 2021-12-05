import React from 'react'
import { Block } from './Block'
import { config } from '../FES/config/index'

const { data, hash, lastHash, timestamp } = config.GENESIS_BLOCK

const HomePage = () => (
  <header className="homePage-Header">
    <h1 className="homePage-HeaderTitle">Fullstack Blockchain based project</h1>
    <Block data={data} hash={hash} lastHash={lastHash} timestamp={timestamp} />
    <a className="homePage-HeaderAuthor" title="developed by David G" href="https://twitter.com/@d4vecarter">
      @d4vecarter
    </a>
  </header>
)

export { HomePage }
