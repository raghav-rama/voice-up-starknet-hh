/** @format */

import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { NFTStorage, Blob } from "nft.storage";
import { Provider, constants, Contract, Account, ec, json } from "starknet";
import { Buffer } from "buffer";
import config from "./config";

window.Buffer = Buffer;
const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkwOUYwN0M4Yjc2ODBBNDZkN0Q0ZDkwMmUzNjcyRDZmMzc3RTZjNzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTU1NDIwNDkyOCwibmFtZSI6Ik9wZW5EYXRhSGFjayJ9.dSwxOQqrrFNGdaoO39NlcIK4G9fSoRKkgaxBrzrA_eg";
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
const myAddress = config.WALLET_PUBLIC_KEY;
const pvtKey = config.WALLET_PRIVATE_KEY;
const IPFSUploader = () => {
  const [ipfs, setIpfs] = useState(null);
  const [hash, setHash] = useState("");
  const [fileBuffer, setFileBuffer] = useState(null);
  const [articleContent, setArticleContent] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const someData = new Blob([`${articleContent}`]);
    const metadata = await client.storeBlob(someData);
    // You can perform any action with the articleContent, e.g., store it, send it to an API, etc.
    console.log("Article content submitted:", articleContent);
    console.log(metadata);
    const hex = await mapToHexValues(metadata);
    const provider = new Provider({
      rpc: { nodeUrl: config.ALCHEMY_RPC_URL },
    });
    const account0 = new Account(provider, myAddress, pvtKey);
    // Connect the deployed Test contract in Testnet
    const testAddress = config.CONTRACT_ADDRESS;
    const { abi: testAbi } = await provider.getClassAt(testAddress);
    if (testAbi === undefined) {
      throw new Error("no abi.");
    }
    const myTestContract = new Contract(testAbi, testAddress, provider);
    myTestContract.connect(account0);
    // Call the store function of Test contract
    const myCall = myTestContract.populate("append_hash", [["df"]]);
    const tx = await myTestContract.append_hash(myCall.calldata);
    console.log(tx);
  };
  async function mapToHexValues(inputString) {
    if (typeof inputString !== "string") {
      return [];
    }

    const hexValuesArray = inputString.split("").map((char) => {
      const charCode = char.charCodeAt(0);
      const hexValue = charCode.toString(16).padStart(4, "0");
      return hexValue;
    });

    return hexValuesArray;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Article</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Article Content:</span>
          <textarea
            className="form-input mt-1 block w-full rounded-md border-gray-300"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            rows={5}
            placeholder="Enter your article content here..."
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IPFSUploader;
