import { config } from "./config";

class Block {
  constructor({ data, difficulty, hash, lastHash, timestamp }) {
    this.data = data;
    this.difficulty = difficulty;
    this.hash = hash;
    this.lastHash = lastHash;
    this.timestamp = timestamp;
  }

  static genesis() {
    this._config = config;
    const {
      data,
      difficulty,
      hash,
      lastHash,
      timestamp,
    } = this._config.GENESIS_BLOCK;

    return new this({ data, difficulty, hash, lastHash, timestamp });
  }

  static mineBlock({ lastBlock, data }) {
    return new this({ timestamp: Date.now(), lastHash: lastBlock.hash, data });
  }
}

export { Block };
