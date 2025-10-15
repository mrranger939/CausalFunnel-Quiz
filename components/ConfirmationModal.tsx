"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  attempted: number;
  unattempted: number;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  attempted,
  unattempted,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-200 mb-2">Are you sure?</h2>
            <p className="text-gray-400 mb-6">You are about to submit your quiz.</p>

            <div className="flex justify-around mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{attempted}</p>
                <p className="text-sm text-gray-500">Attempted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{unattempted}</p>
                <p className="text-sm text-gray-500">Unattempted</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="w-full py-3 font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="w-full py-3 font-semibold text-white bg-green-700 border border-green-600 rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}