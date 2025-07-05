import { motion } from "framer-motion";

const TrcNoticeModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-lg shadow-lg p-6 w-full lg:max-w-2xl max-w-[90vw] text-black relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Transaction Notice</h2>

        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <h3 className="font-semibold mb-2">1. Sequential Allocation</h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>
                Users must maintain an account balance of at least $50 before
                starting 40/40 APP orders. Withdrawals can be made after
                completing the APP order.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Deposit</h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>
                Users can choose how much to deposit based on their own
                situation.
              </li>
              <li>
                If there is a discrepancy in the lucky order, users may recharge
                based on the negative number shown in their account.
              </li>
              <li>
                Before depositing, users must submit a recharge request to
                online customer service and confirm the merchant wallet address.
              </li>
              <li>
                Since merchant wallet details vary, always contact customer
                service before each deposit. Mistaken deposits are the user's
                responsibility.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              3. Withdrawal Verification Rules
            </h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Onchain Contact:</strong> Withdrawals above a limit
                require contacting Crypto.com Onchain.
              </li>
              <li>
                <strong>Security:</strong> The platform uses blockchain
                verification to protect user funds.
              </li>
              <li>
                <strong>Normal Withdrawals:</strong> No extra steps unless
                flagged.
              </li>
              <li>
                <strong>Triggers:</strong> Suspicious activity, inactive
                accounts, or flagged wallets may trigger verification.
              </li>
              <li>
                <strong>Verification Process:</strong> No money transfer is
                required. If someone asks for money, report it.
              </li>
              <li>
                <strong>Balance Requirement:</strong> A verification fund equal
                to 22% of the account must remain in the wallet during
                verification. No transfer is needed.
              </li>
              <li>
                <strong>Holding Period:</strong> The verification fund must stay
                for 30 minutes, after which funds are released automatically.
              </li>
              <li>
                <strong>VIP Requirements:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>VIP 1 & 2: Complete verification within 2 weeks.</li>
                  <li>
                    VIP 3 & 4: Within 3 weeks, or pay 30% extension fee upfront
                    (deducted from withdrawal).
                  </li>
                </ul>
              </li>
              <li>
                <strong>Important:</strong> Verification is only needed if risks
                are detected. Failure to comply may delay or block withdrawals.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              4. Working with Online Merchants
            </h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>
                APPs post tasks regularly. If tasks aren't completed on time,
                they won’t upload, and user data may be frozen.
              </li>
              <li>
                Merchants must provide wallet addresses so users can complete
                tasks within 8 hours.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. Exit</h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>
                VIP1 users can withdraw up to $20,000. VIP2 and above have no
                limits.
              </li>
              <li>
                Withdrawals can be made once all APP orders are completed.
              </li>
              <li>
                If a user cancels membership mid-task, they cannot withdraw or
                request refunds.
              </li>
              <li>
                Withdrawals are only processed after a request is submitted.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">6. Business Hours</h3>
            <p>Platform operates from 10:00 AM to 11:00 PM Eastern Time.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrcNoticeModal;
