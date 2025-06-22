import { Wallet, Banknote, CreditCard, FileDown, Clock } from "lucide-react";
import MainContainer from "../../components/containers/MainContainer";

const WalletPage = () => {
  return (
    <MainContainer>
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Wallet Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base text-gray-500">Available Balance</h3>
                <p className="text-3xl font-bold text-gray-800">$25,000.00</p>
                <p className="mt-1 text-sm italic text-blue-600">
                  Frozen: $10,000.00
                </p>
              </div>
              <Wallet className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          {/* Withdrawal Options */}
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-base font-medium text-gray-600 mb-4 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-green-600" />
              Withdrawal Options
            </h3>
            <div className="space-y-3">
              <button className="flex items-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                <CreditCard className="w-5 h-5" />
                Withdraw with Card
              </button>
              <button className="flex items-center gap-2 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                <Wallet className="w-5 h-5" />
                Withdraw to Wallet
              </button>
              <button className="flex items-center gap-2 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                <Banknote className="w-5 h-5" />
                Withdraw to Bank
              </button>
            </div>
          </div>

          {/* Transaction Actions */}
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-base font-medium text-gray-600 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Transaction Actions
            </h3>
            <div className="space-y-3">
              <button className="flex items-center gap-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                <Clock className="w-5 h-5" />
                View Transactions
              </button>
              <button className="flex items-center gap-2 w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition">
                <FileDown className="w-5 h-5" />
                Download Statement
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default WalletPage;
