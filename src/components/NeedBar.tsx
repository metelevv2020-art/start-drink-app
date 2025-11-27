import React from 'react';

interface NeedBarProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  maxValue?: number;
}

export function NeedBar({ icon, label, value, maxValue = 100 }: NeedBarProps) {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
  
  const getBarColor = () => {
    if (percentage >= 70) return 'bg-[#8BBF9F]';
    if (percentage >= 40) return 'bg-[#D6BA73]';
    return 'bg-red-400';
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#857E7B]">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-[#857E7B]">{label}</span>
          <span className="text-xs text-[#857E7B]">{Math.round(value)}%</span>
        </div>
        <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden border border-[#857E7B]/20">
          <div
            className={`h-full ${getBarColor()} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
