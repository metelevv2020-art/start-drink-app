import React from 'react';
import { motion } from 'motion/react';

type PetState = 'happy' | 'hungry' | 'dirty' | 'wet' | 'sleeping' | 'sick' | 'baby' | 'adult';

interface StatusBadgeProps {
  state: PetState;
}

export function StatusBadge({ state }: StatusBadgeProps) {
  const getStateInfo = () => {
    switch (state) {
      case 'happy':
        return { emoji: '😊', text: 'Счастлив', color: 'bg-[#8BBF9F]' };
      case 'hungry':
        return { emoji: '😋', text: 'Голоден', color: 'bg-[#D6BA73]' };
      case 'dirty':
        return { emoji: '🫧', text: 'Грязный', color: 'bg-[#857E7B]' };
      case 'wet':
        return { emoji: '💧', text: 'Мокрый', color: 'bg-blue-400' };
      case 'sleeping':
        return { emoji: '💤', text: 'Спит', color: 'bg-indigo-400' };
      case 'sick':
        return { emoji: '🤒', text: 'Болеет', color: 'bg-red-400' };
      case 'baby':
        return { emoji: '🍼', text: 'Малыш', color: 'bg-pink-400' };
      case 'adult':
        return { emoji: '✨', text: 'Взрослый', color: 'bg-[#8BBF9F]' };
      default:
        return { emoji: '😊', text: 'Счастлив', color: 'bg-[#8BBF9F]' };
    }
  };

  const info = getStateInfo();

  const getPulseAnimation = () => {
    if (state === 'hungry' || state === 'sick') {
      return {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      };
    }
    return {};
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, ...getPulseAnimation() }}
      className={`${info.color} text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}
    >
      <span className="text-xl">{info.emoji}</span>
      <span className="text-sm">{info.text}</span>
    </motion.div>
  );
}
