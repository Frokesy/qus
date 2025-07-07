import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface WithdrawToWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, wallet: string, walletAddress: string) => void;
  balance: string | undefined;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 50 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 50 },
};

const WithdrawToWalletModal = ({
  isOpen,
  onClose,
  onSubmit,
  balance,
}: WithdrawToWalletModalProps) => {
  const [amount, setAmount] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("USDT");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const numericBalance = Number(balance) || 0;
  const numericAmount = Number(amount);

  useEffect(() => {
    if (numericAmount <= numericBalance) {
      setError("");
    }
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/^0+(?=\d)/, "");
    const parsedValue = Number(cleaned);

    if (parsedValue > numericBalance) {
      setError("Withdrawal amount exceeds available balance.");
    } else {
      setError("");
    }

    setAmount(cleaned);
  };

  const handleSubmit = () => {
    if (numericAmount <= 0 || !walletAddress.trim()) {
      setError("Please enter a valid amount and wallet address.");
      return;
    }

    onSubmit(numericAmount, walletType, walletAddress.trim());
    onClose();
    setAmount("");
    setWalletAddress("");
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-[#1B1B2F] text-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-6 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-300 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-center">
              Withdraw to Wallet
            </h2>

            <div className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-sm mb-1">Amount (USD):</label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className={`w-full bg-[#2C2C3A] border ${
                    error && numericAmount > numericBalance
                      ? "border-red-500"
                      : "border-gray-600"
                  } text-white p-2 rounded-md focus:outline-none focus:ring-2 ${
                    error && numericAmount > numericBalance
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  placeholder="Enter amount"
                  min={0}
                />
                <span className="text-sm text-green-400 mt-1 inline-block">
                  Withdrawable Balance:{" "}
                  <span className="font-semibold">${numericBalance}</span>
                </span>
              </div>

              {/* Wallet Type */}
              <div>
                <label className="block text-sm mb-1">Select Wallet:</label>
                <select
                  value={walletType}
                  onChange={(e) => setWalletType(e.target.value)}
                  className="w-full bg-[#2C2C3A] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USDT">USDT (TRC20)</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                </select>
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-sm mb-1">Wallet Address:</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full bg-[#2C2C3A] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter your ${walletType} address`}
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 font-medium">{error}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <button
                onClick={onClose}
                className="w-full py-2 border border-gray-500 rounded-md text-gray-300 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Confirm Withdraw
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WithdrawToWalletModal;
