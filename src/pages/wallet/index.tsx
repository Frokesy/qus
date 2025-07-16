import {
  Wallet,
  Banknote,
  CreditCard,
  FileDown,
  Clock,
  CreditCardIcon,
} from "lucide-react";
import MainContainer from "../../components/containers/MainContainer";
import { useAuthStore } from "../../stores/useAuthStore";
import Spinner from "../../components/defaults/Spinner";
import SelfClosingModal from "../../components/modals/SelfclosingModal";
import { useState } from "react";
import WithdrawToWalletModal from "../../components/modals/WithdrawToWalletModal";
import { supabase } from "../../utils/supabaseClient";

const WalletPage = () => {
  const { user, loading } = useAuthStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleWithdrawSubmit = async (amount: number, wallet: string) => {
    if (!user || !user.id) return;

    const currentBalance = parseFloat(user.total_earnings || "0");
    const newBalance = currentBalance - amount;

    if (newBalance < 0) {
      setModalMessage("Insufficient balance for withdrawal.");
      setShowModal(true);
      return;
    }

    setModalMessage("Processing your withdrawal...");
    setShowModal(true);

    const { error } = await supabase
      .from("users")
      .update({ total_earnings: newBalance.toString() })
      .eq("user_id", user.user_id);

    if (error) {
      setModalMessage("Failed to process withdrawal. Please try again.");
      return;
    }

    useAuthStore.setState((prev) => ({
      user: {
        ...prev.user!,
        total_earnings: newBalance.toString(),
      },
    }));

    setModalMessage(
      `Withdrawal of $${amount} to ${wallet} was successful! New balance: $${newBalance}.`,
    );
  };

  const triggerUnavailableModal = () => {
    setModalMessage(
      "This withdrawal option is currently unavailable. Please try again later.",
    );
    setShowModal(true);
  };

  if (loading) return <Spinner />;

  return (
    <MainContainer>
      <div className="space-y-6 h-[80vh] overflow-y-auto lg:pb-0 pb-20">
        <h2 className="text-2xl font-semibold text-gray-300">
          Wallet Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="bg-[#1B1B2F] text-[#fff] border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base text-[18px] font-semibold text-gray-300">
                  Available Balance
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${user?.total_earnings || 0}
                </p>
              </div>
              <Wallet className="w-10 h-10 text-blue-500" />
            </div>
            <div className="mt-4">
              <h3 className="text-base text-[18px] font-semibold text-gray-300">
                Frozen Balance
              </h3>
              <p className="text-3xl font-bold text-blue-300">
                ${user?.frozen_balance || 0}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-base text-[18px] font-semibold text-gray-300">
                Special Lucky Bonus
              </h3>
              <p className="text-3xl font-bold text-yellow-300">$2,700.00</p>
            </div>
          </div>

          <div className="bg-[#1B1B2F] border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-base font-medium text-gray-300 mb-4 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-green-600" />
              Withdrawal Options
            </h3>
            <div className="space-y-3">
              <button
                className="flex items-center gap-2 w-full bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={triggerUnavailableModal}
              >
                <CreditCard className="w-5 h-5" />
                Withdraw with Card
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="flex items-center gap-2 w-full cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                <Wallet className="w-5 h-5" />
                Withdraw to Address
              </button>
              <button
                className="flex items-center cursor-pointer gap-2 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={triggerUnavailableModal}
              >
                <Banknote className="w-5 h-5" />
                Withdraw to Bank
              </button>
            </div>
          </div>

          <div className="bg-[#1B1B2F] border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-base font-medium text-gray-300 mb-4 flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5 text-yellow-400" />
              Deposit
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setModalMessage(
                    "Please contact online customer service to obtain the platform's current wallet address for top-ups.",
                  );
                  setShowModal(true);
                }}
                className="flex items-center gap-2 w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
              >
                <Wallet className="w-5 h-5" />
                Deposit Funds
              </button>
            </div>
          </div>
          <div className="bg-[#1B1B2F] border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-base font-medium text-gray-300 mb-4 flex items-center gap-2">
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

      <SelfClosingModal
        message={modalMessage}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <WithdrawToWalletModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onSubmit={handleWithdrawSubmit}
        balance={user?.total_earnings}
      />
    </MainContainer>
  );
};

export default WalletPage;
