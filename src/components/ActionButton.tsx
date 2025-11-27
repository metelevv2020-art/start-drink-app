import React from 'react';
import { motion } from 'motion/react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function ActionButton({ icon, label, onClick, disabled, variant = 'primary' }: ActionButtonProps) {
  const getColors = () => {
    if (variant === 'secondary') {
      return 'bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 border-[#8BBF9F]/50';
    }
    return 'bg-[#D6BA73] hover:bg-[#D6BA73]/90 border-[#857E7B]/30';
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center gap-2 
        ${getColors()}
        rounded-2xl p-4 
        border-2
        transition-all
        shadow-sm hover:shadow-md
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'}
      `}
    >
      <div className={`${variant === 'secondary' ? 'text-white' : 'text-[#857E7B]'}`}>
        {icon}
      </div>
      <span className={`text-sm ${variant === 'secondary' ? 'text-white' : 'text-[#857E7B]'}`}>
        {label}
      </span>
    </motion.button>
  );
}
