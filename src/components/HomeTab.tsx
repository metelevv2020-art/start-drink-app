import React from 'react';
import { motion } from 'motion/react';
import { ChinchillaAvatar } from './ChinchillaAvatar';
import { NeedsPanel } from './NeedsPanel';
import { ActionButton } from './ActionButton';
import { StatusBadge } from './StatusBadge';
import { UtensilsCrossed, Droplets, Gamepad2, Moon, Cross, Share2 } from 'lucide-react';

type PetState = 'happy' | 'hungry' | 'dirty' | 'wet' | 'sleeping' | 'sick' | 'baby' | 'adult';

interface PetNeeds {
  hunger: number;
  cleanliness: number;
  happiness: number;
  energy: number;
  health: number;
}

interface HomeTabProps {
  petName: string;
  petAge: number;
  petState: PetState;
  needs: PetNeeds;
  isSleeping: boolean;
  onAction: (action: string) => void;
  onShare?: () => void;
}

export function HomeTab({ 
  petName, 
  petAge, 
  petState, 
  needs, 
  isSleeping,
  onAction,
  onShare 
}: HomeTabProps) {
  return (
    <div className="space-y-6">
      {/* Аватар питомца */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/30 rounded-3xl p-8 border-2 border-[#857E7B]/20"
      >
        <div className="flex flex-col items-center gap-4">
          <ChinchillaAvatar state={petState} size={256} />
          <div className="text-center space-y-3">
            <h2 className="text-[#857E7B]">{petName}</h2>
            <StatusBadge state={petState} />
            <p className="text-sm text-[#857E7B]/70">{petAge} дней вместе</p>
          </div>
        </div>
      </motion.div>

      {/* Панель потребностей */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <NeedsPanel
          hunger={needs.hunger}
          cleanliness={needs.cleanliness}
          happiness={needs.happiness}
          energy={needs.energy}
          health={needs.health}
        />
      </motion.div>

      {/* Кнопки действий */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-3 gap-3 mb-3">
          <ActionButton
            icon={<UtensilsCrossed size={24} />}
            label="Кормить"
            onClick={() => onAction('feed')}
            disabled={isSleeping}
          />
          <ActionButton
            icon={<Droplets size={24} />}
            label="Мыть"
            onClick={() => onAction('wash')}
            disabled={isSleeping}
          />
          <ActionButton
            icon={<Gamepad2 size={24} />}
            label="Играть"
            onClick={() => onAction('play')}
            disabled={isSleeping}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <ActionButton
            icon={<Moon size={24} />}
            label="Спать"
            onClick={() => onAction('sleep')}
            disabled={isSleeping}
          />
          <ActionButton
            icon={<Cross size={24} />}
            label="Лечить"
            onClick={() => onAction('heal')}
            disabled={isSleeping}
          />
          {onShare && (
            <ActionButton
              icon={<Share2 size={24} />}
              label="Пригласить"
              onClick={onShare}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
