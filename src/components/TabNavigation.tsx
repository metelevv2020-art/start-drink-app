import React from 'react';
import { motion } from 'motion/react';
import { Home, Users, Settings } from 'lucide-react';

export type TabType = 'home' | 'users' | 'settings';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'home' as TabType, label: 'Питомец', icon: Home },
    { id: 'users' as TabType, label: 'Друзья', icon: Users },
    { id: 'settings' as TabType, label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F5E0B7] border-t-2 border-[#857E7B]/20 pb-safe z-50">
      <div className="flex justify-around items-center px-4 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 min-w-[70px] relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#D6BA73] rounded-2xl"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon
                  size={24}
                  className={`transition-colors ${
                    isActive ? 'text-white' : 'text-[#857E7B]'
                  }`}
                />
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-white' : 'text-[#857E7B]'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
