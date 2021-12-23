import React from 'react'

export const BlockComponent = ({ blockData }) => (
  <div>
    <h3>{blockData?.data}</h3>
    <p>Hash: {blockData?.hash}</p>
    <p>Last hash:{blockData?.lastHash}</p>
    <p>Date: {blockData?.timestamp}</p>
  </div>
)
