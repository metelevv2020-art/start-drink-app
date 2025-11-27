import React from 'react';
import { motion } from 'motion/react';

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  hungerValue: number;
}

interface FeedingModalProps {
  onFeed: (food: FoodItem) => void;
}

const foodItems: FoodItem[] = [
  { id: '1', name: 'Сено', emoji: '🌾', hungerValue: 15 },
  { id: '2', name: 'Гранулы', emoji: '🫘', hungerValue: 25 },
  { id: '3', name: 'Яблоко', emoji: '🍎', hungerValue: 10 },
  { id: '4', name: 'Морковь', emoji: '🥕', hungerValue: 12 },
  { id: '5', name: 'Изюм', emoji: '�葡', hungerValue: 8 },
  { id: '6', name: 'Орехи', emoji: '🥜', hungerValue: 20 },
];

export function FeedingModal({ onFeed }: FeedingModalProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {foodItems.map((food, index) => (
        <motion.button
          key={food.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFeed(food)}
          className="flex flex-col items-center gap-2 p-4 bg-white/50 hover:bg-[#D6BA73]/50 rounded-2xl border-2 border-[#857E7B]/20 transition-colors"
        >
          <span className="text-3xl">{food.emoji}</span>
          <span className="text-xs text-[#857E7B]">{food.name}</span>
          <span className="text-xs text-[#8BBF9F]">+{food.hungerValue}%</span>
        </motion.button>
      ))}
    </div>
  );
}
