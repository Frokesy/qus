import { motion } from "framer-motion";

const TaskDescriptionModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white dark:bg-[#1b1b2f] rounded-lg shadow-lg p-6 w-full lg:max-w-2xl max-w-[90vw] text-black dark:text-white relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4 text-center">
          Task Instructions
        </h2>

        <div className="space-y-6 text-sm leading-relaxed">
          {/* Section 1 */}
          <div>
            <h3 className="font-semibold text-base mb-2">
              1. Common Applications
            </h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Deposit Requirement:</strong> Each set of tasks requires
                over $50 deposit. Users may apply for up to 3 sets.
              </li>
              <li>
                <strong>Withdrawal:</strong> Once a set is completed, users can
                either withdraw or proceed to the next set.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="font-semibold text-base mb-2">2. Normal Tasks</h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>Each day, users can complete 3 sets (40 tasks each).</li>
              <li>
                Commissions vary by VIP level:
                <ul className="list-disc pl-5 mt-1">
                  <li>VIP1: 0.5%</li>
                  <li>VIP2: 0.7%</li>
                  <li>VIP3: 1.2%</li>
                  <li>VIP4: 1.6%</li>
                </ul>
              </li>
              <li>
                Fees & commissions are refunded immediately after task
                completion.
              </li>
              <li>
                Tasks are assigned based on account balance and cannot be
                skipped or canceled.
              </li>
              <li>Task values and income increase with balance.</li>
              <li>
                “40/40” indicates all tasks are complete. User may then withdraw
                or proceed.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="font-semibold text-base mb-2">3. Lucky Tasks</h3>
            <ul className="list-decimal pl-5 space-y-1">
              <li>Lucky tasks appear randomly (max 3 per set).</li>
              <li>Chances: 50% for 1, 25% for 2, 1% for 3 lucky tasks.</li>
              <li>
                Some merchants pay for increased engagement and visibility.
              </li>
              <li>
                Lucky task rewards are refunded instantly after completion.
              </li>
              <li>
                <strong>Commission:</strong> 10x the task value.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskDescriptionModal;
