export class GenericBlockError extends Error {
  static create(msg) {
    return new GenericBlockError(msg)
  }
}
