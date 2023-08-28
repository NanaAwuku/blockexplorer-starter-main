import { useParams } from 'react-router-dom';

function BlockDetails() {
  const { blockNumber } = useParams();

  // Fetch block details based on the blockNumber using the appropriate API call

  return (
    <div>
      <h2>Block Details - Block Number: {blockNumber}</h2>
      {/* Display block details here */}
    </div>
  );
}

export default BlockDetails;
