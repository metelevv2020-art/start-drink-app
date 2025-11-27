import React from 'react';
import { NeedBar } from './NeedBar';
import { Heart, UtensilsCrossed, Sparkles, Moon, Cross } from 'lucide-react';

interface NeedsPanelProps {
  hunger: number;
  cleanliness: number;
  happiness: number;
  energy: number;
  health: number;
}

export function NeedsPanel({ hunger, cleanliness, happiness, energy, health }: NeedsPanelProps) {
  return (
    <div className="bg-[#F5E0B7] rounded-3xl p-6 border-2 border-[#857E7B]/20 space-y-4">
      <h3 className="text-[#857E7B] mb-4">Потребности</h3>
      <NeedBar icon={<UtensilsCrossed size={20} />} label="Голод" value={hunger} />
      <NeedBar icon={<Sparkles size={20} />} label="Чистота" value={cleanliness} />
      <NeedBar icon={<Heart size={20} />} label="Настроение" value={happiness} />
      <NeedBar icon={<Moon size={20} />} label="Энергия" value={energy} />
      <NeedBar icon={<Cross size={20} />} label="Здоровье" value={health} />
    </div>
  );
}
