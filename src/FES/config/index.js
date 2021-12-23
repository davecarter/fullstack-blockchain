const LOCALE = {
  EUR: 'es-ES',
  USD: 'en-US',
}

const GENESIS_BLOCK = {
  data: 'This is the GENESIS block',
  difficulty: 2,
  hash: '',
  lastHash: 'GENESIS hash',
  nonce: 1,
  timestamp: Date.now(),
}

const config = {
  LOCALE,
  GENESIS_BLOCK,
}

export { config }
