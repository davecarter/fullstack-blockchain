import { config } from "./config";
import { cryptoHash } from "./CryptoHash";

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
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const difficulty = lastBlock.difficulty;

    return new this({
      data,
      difficulty,
      hash: cryptoHash(data, difficulty, lastHash, timestamp),
      lastHash,
      timestamp,
    });
  }
}

export { Block };
