import { Block } from "../FES";

describe("Creates the Genesis Block", () => {
  const data = "This is the GENESIS block";
  const difficulty = "0000";
  const hash = "0000000000";
  const lastHash = "0000";
  const timestamp = "Initial date";

  const block = Block.genesis();

  it("builds a Block containing data, difficulty, hash, lastHash and timestamp properties", () => {
    expect(block.data).toEqual(data);
    expect(block.difficulty).toEqual(difficulty);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.timestamp).toEqual(timestamp);
  });
});
