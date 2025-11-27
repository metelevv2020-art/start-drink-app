import React from 'react';
import { motion } from 'motion/react';
import { ChinchillaAvatar } from './ChinchillaAvatar';

type PetState = 'happy' | 'hungry' | 'dirty' | 'wet' | 'sleeping' | 'sick' | 'baby' | 'adult';

export function StateGallery() {
  const states: { state: PetState; label: string }[] = [
    { state: 'happy', label: 'Счастлив' },
    { state: 'hungry', label: 'Голоден' },
    { state: 'dirty', label: 'Грязный' },
    { state: 'wet', label: 'Мокрый' },
    { state: 'sleeping', label: 'Спит' },
    { state: 'sick', label: 'Болеет' },
    { state: 'baby', label: 'Малыш' },
    { state: 'adult', label: 'Взрослый' },
  ];

  return (
    <div className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20">
      <h3 className="text-[#857E7B] mb-4">Галерея состояний</h3>
      <div className="grid grid-cols-2 gap-4">
        {states.map((item, index) => (
          <motion.div
            key={item.state}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/50 rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <ChinchillaAvatar state={item.state} size={96} />
            <span className="text-xs text-[#857E7B]">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
