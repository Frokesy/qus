import MainContainer from "../../components/containers/MainContainer";

const Wallet = () => {
  return (
    <MainContainer>
      <h2 className="text-[30px] font-semibold">Wallet Overview</h2>
      <div className="flex justify-between items-baseline">
        <div className="w-[30%] flex flex-col border border-[#ccc] rounded-2xl mt-10 p-6">
          <span className="text-[18px] font-semibold">Available Balance</span>
          <span className="text-[40px] font-semibold">$25,000.00</span>
          <span className="italic text-blue-600 text-[20px]">
            Frozen Balance: $10,000.00
          </span>
        </div>

        {/* Withdrawal options */}
        <div className="w-[30%] flex flex-col border border-[#ccc] rounded-2xl mt-10 p-6">
          <span className="text-[18px] font-semibold">Withdrawal Options</span>
          <div className="flex flex-col mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2">
              Withdraw with Card
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md mb-2">
              Withdraw with Wallet
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md mb-2">
              Withdraw with Bank Transfer
            </button>
          </div>
        </div>

        {/* Transaction history */}
        <div className="w-[30%] flex flex-col border border-[#ccc] rounded-2xl mt-10 p-6">
          <span className="text-[18px] font-semibold">Transaction History</span>
          <div className="flex flex-col mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2">
              View Transactions
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md mb-2">
              Download Statement
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Wallet;
