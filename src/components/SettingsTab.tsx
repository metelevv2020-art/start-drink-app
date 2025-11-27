import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Volume2, Palette, Info, Edit3 } from 'lucide-react';
import { StateGallery } from './StateGallery';

interface SettingsTabProps {
  petName: string;
  onNameChange: (name: string) => void;
}

export function SettingsTab({ petName, onNameChange }: SettingsTabProps) {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(petName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onNameChange(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings size={24} className="text-[#857E7B]" />
        <h2 className="text-[#857E7B]">Настройки</h2>
      </div>

      {/* Основные настройки */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20 space-y-4"
      >
        <h3 className="text-[#857E7B]">Основные</h3>
        
        {/* Имя питомца */}
        <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
          <div className="flex items-center gap-3">
            <Edit3 size={20} className="text-[#857E7B]" />
            <div>
              {isEditingName ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleSaveName}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                  className="bg-white border-2 border-[#D6BA73] rounded-lg px-3 py-1 text-[#857E7B] focus:outline-none"
                  autoFocus
                  maxLength={20}
                />
              ) : (
                <div>
                  <p className="text-sm text-[#857E7B]">Имя питомца</p>
                  <p className="text-xs text-[#857E7B]/60">{petName}</p>
                </div>
              )}
            </div>
          </div>
          {!isEditingName && (
            <button
              onClick={() => setIsEditingName(true)}
              className="text-[#D6BA73] hover:text-[#D6BA73]/80 text-sm"
            >
              Изменить
            </button>
          )}
        </div>

        {/* Уведомления */}
        <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-[#857E7B]" />
            <div>
              <p className="text-sm text-[#857E7B]">Уведомления</p>
              <p className="text-xs text-[#857E7B]/60">Получать напоминания</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors ${
              notifications ? 'bg-[#8BBF9F]' : 'bg-[#857E7B]/30'
            }`}
          >
            <motion.div
              animate={{ x: notifications ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow"
            />
          </button>
        </div>

        {/* Звук */}
        <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-[#857E7B]" />
            <div>
              <p className="text-sm text-[#857E7B]">Звуки</p>
              <p className="text-xs text-[#857E7B]/60">Звуковые эффекты</p>
            </div>
          </div>
          <button
            onClick={() => setSound(!sound)}
            className={`w-12 h-6 rounded-full transition-colors ${
              sound ? 'bg-[#8BBF9F]' : 'bg-[#857E7B]/30'
            }`}
          >
            <motion.div
              animate={{ x: sound ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow"
            />
          </button>
        </div>
      </motion.div>

      {/* О приложении */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20"
      >
        <h3 className="text-[#857E7B] mb-3">О приложении</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <Info size={20} className="text-[#857E7B]" />
            <div>
              <p className="text-sm text-[#857E7B]">Версия</p>
              <p className="text-xs text-[#857E7B]/60">1.0.0</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
            <Palette size={20} className="text-[#857E7B]" />
            <div>
              <p className="text-sm text-[#857E7B]">Дизайн</p>
              <p className="text-xs text-[#857E7B]/60">Chinchilla Tamagotchi</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20"
      >
        <h3 className="text-[#857E7B] mb-3">Статистика</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/50 rounded-xl p-4 text-center">
            <p className="text-2xl text-[#D6BA73] mb-1">7</p>
            <p className="text-xs text-[#857E7B]/60">Дней вместе</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 text-center">
            <p className="text-2xl text-[#8BBF9F] mb-1">42</p>
            <p className="text-xs text-[#857E7B]/60">Действий</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 text-center">
            <p className="text-2xl text-[#D6BA73] mb-1">85%</p>
            <p className="text-xs text-[#857E7B]/60">Счастье</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 text-center">
            <p className="text-2xl text-[#8BBF9F] mb-1">2</p>
            <p className="text-xs text-[#857E7B]/60">Друзей</p>
          </div>
        </div>
      </motion.div>

      {/* Галерея состояний */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StateGallery />
      </motion.div>
    </div>
  );
}
