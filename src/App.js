import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockInfo, setBlockInfo] = useState();
  const [error, setError] = useState(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  useEffect(() => {
    async function getBlockInfo() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        const block = await alchemy.core.getBlockWithTransactions(blockNumber); // Fetch block with transactions
        setBlockInfo(block);
      } catch (error) {
        setError(error);
      }
    }

    getBlockInfo();
  }, []);

  const displayedTransactions = showAllTransactions
    ? blockInfo?.transactions
    : blockInfo?.transactions.slice(0, 5);

  return (
    <div className="w-full bg-blue-50 h-screen p-4 flex">
      <div className="w-1/2 pr-4">
        {error && <div className="text-red-500">{error.message}</div>}
        {blockInfo && (
          <div className="mb-4">
            <h2 className="mb-2 text-1xl text-left capitalize text-blue-800">
              Latest Block Information
            </h2>
            <div className="bg-white h-auto p-4 divide-y divide-blue-200">
              <div className="py-3 flex justify-between items-center">
                <span className="text-[12px] font-semibold">Block Number:</span>
                <span className="text-[12px]">{blockInfo.number}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[12px] font-semibold">Block Hash:</span>
                <span className="text-[12px]">{blockInfo.hash.substring(0, 40)}...</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[12px] font-semibold">Miner:</span>
                <span className="text-[12px]">{blockInfo.miner.substring(0, 40)}...</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[12px] font-semibold">Transaction Count:</span>
                <span className="text-[12px]">{blockInfo.transactions.length}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[12px] font-semibold">Timestamp:</span>
                <span className="text-[12px]">{blockInfo.timestamp}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/2 pl-4">
        {blockInfo && (
          <div>
            <h3 className="mb-2 text-right capitalize text-blue-800">
              Transaction List
            </h3>
            <div className="divide-y divide-blue-200 h-screen bg-white">
              {displayedTransactions &&
                displayedTransactions.map((tx, index) => (
                  <div key={index} className="py-1 px-3 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-3">
                        <span className="bg-slate-200 p-2 rounded-full text-[10px]">
                          TX
                        </span>
                        <span className="text-[12px]">
                          {tx.hash.substring(0, 8)}...{" "}
                        </span>
                      </span>
                      <span className="flex flex-col">
                        <div>
                          <span className="text-[12px]">From:</span>
                          <span className="text-[12px]">
                            {tx.from.substring(0, 20)}...
                          </span>
                        </div>
                        <div>
                          <span className="text-[12px]">To:</span>{" "}
                          <span className="text-[12px]">
                            {tx.to.substring(0, 20)}...
                          </span>
                        </div>
                      </span>
                      <span className="text-[12px] bg-slate-200 p-1">
                        {tx.value.toString().substring(0, 5)}
                      </span>
                    </div>
                  </div>
                ))}
              {!showAllTransactions && (
                <button
                  className="mt-4 py-1 px-4 bg-blue-500 w-full text-white rounded-md"
                  onClick={() => setShowAllTransactions(true)}
                >
                  Load All Transactions
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
