import React from 'react';
import { motion } from 'motion/react';

export interface Activity {
  id: string;
  action: string;
  time: Date;
  user?: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20">
      <h3 className="text-[#857E7B] mb-3">Последние действия</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-sm text-[#857E7B]/60 text-center py-4">
            Пока нет активности
          </p>
        ) : (
          activities.slice(0, 5).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center text-sm p-2 rounded-xl bg-white/50"
            >
              <span className="text-[#857E7B]">
                {activity.user && <span className="opacity-70">{activity.user}: </span>}
                {activity.action}
              </span>
              <span className="text-xs text-[#857E7B]/60">
                {new Date(activity.time).toLocaleTimeString('ru-RU', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
