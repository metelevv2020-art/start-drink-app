import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ActionModal({ isOpen, onClose, title, children }: ActionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-[#F5E0B7] rounded-3xl p-6 z-50 border-2 border-[#857E7B]/30 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#857E7B]">{title}</h3>
              <button
                onClick={onClose}
                className="text-[#857E7B] hover:bg-white/50 rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
