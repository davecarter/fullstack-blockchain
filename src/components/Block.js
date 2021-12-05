import React from 'react'

export const Block = ({ data, hash, lastHash, timestamp }) => {
  return (
    <div>
      <p>Data: {data}</p>
      <p>Hash: {hash}</p>
      <p>Last hash:{lastHash}</p>
      <p>Date: {timestamp}</p>
    </div>
  )
}
