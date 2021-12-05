import crypto from 'crypto'

const cryptoHash = (...inputData) => {
  // creates a hash object
  const hash = crypto.createHash('sha256')

  // updates the hashed value based on new input data
  // sorts before joinning hashed data
  hash.update(inputData.sort().join(' '))

  // digest method returns the resuling updated value
  return hash.digest('hex')
}

export { cryptoHash }
