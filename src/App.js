import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockInfo, setBlockInfo] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBlockInfo() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        const block = await alchemy.core.getBlock(blockNumber);
        setBlockInfo(block);
      } catch (error) {
        setError(error);
      }
    }

    getBlockInfo();
  }, []);

  return (
    <div className="w-full bg-blue-50 h-screen p-4">
      {error && (
        <div className="text-red-500">{error.message}</div>
      )}
      {blockInfo && (
        <>
          <h2 className="mb-4 text-2xl text-center text-blue-800">Block Details</h2>
          <div className="flex flex-col divide-y divide-blue-200 mx-10">
            <div className="flex justify-between py-2 bg-white px-3">
              <p className="font-semibold ">Block Number:</p>
              <p className="">{blockInfo.number}</p>
            </div>
            <div className="flex justify-between py-2 bg-white px-3">
              <p className="font-semibold ">Block Hash:</p>
              <p className="">{blockInfo.hash}</p>
            </div>
            <div className="flex justify-between py-2 bg-white px-3">
              <p className="font-semibold ">Miner:</p>
              <p className="">{blockInfo.miner}</p>
            </div>
            <div className="flex justify-between py-2 bg-white px-3">
              <p className="font-semibold ">Transaction Count:</p>
              <p className="">{blockInfo.transactions.length}</p>
            </div>
            <div className="flex justify-between py-2 bg-white px-3">
              <p className="font-semibold ">Timestamp:</p>
              <p className="">{blockInfo.timestamp}</p>
            </div>
           
          </div>
        </>
      )}
    </div>
  );
}

export default App;
