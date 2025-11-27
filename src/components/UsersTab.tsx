import React from 'react';
import { motion } from 'motion/react';
import { Users, Crown, Share2, UserPlus } from 'lucide-react';
import { Activity } from './ActivityLog';

interface Collaborator {
  id: string;
  username: string;
  isOwner: boolean;
  currentAction?: string;
  photoUrl?: string;
}

interface UsersTabProps {
  collaborators: Collaborator[];
  currentUserId: string;
  activities: Activity[];
  onShare: () => void;
}

export function UsersTab({ collaborators, currentUserId, activities, onShare }: UsersTabProps) {
  return (
    <div className="space-y-6">
      {/* Заголовок с кнопкой приглашения */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users size={24} className="text-[#857E7B]" />
          <h2 className="text-[#857E7B]">Друзья</h2>
        </div>
        <button
          onClick={onShare}
          className="flex items-center gap-2 bg-[#D6BA73] hover:bg-[#D6BA73]/90 px-4 py-2 rounded-xl text-[#857E7B] transition-colors"
        >
          <UserPlus size={18} />
          <span className="text-sm">Пригласить</span>
        </button>
      </div>

      {/* Список соопекунов */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20"
      >
        <h3 className="text-[#857E7B] mb-3">Соопекуны</h3>
        <div className="space-y-2">
          {collaborators.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#857E7B]/60 mb-4">Пока нет друзей</p>
              <button
                onClick={onShare}
                className="inline-flex items-center gap-2 bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 px-6 py-3 rounded-2xl text-white transition-colors"
              >
                <Share2 size={18} />
                Пригласить друга
              </button>
            </div>
          ) : (
            collaborators.map((collab, index) => (
              <motion.div
                key={collab.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  collab.id === currentUserId ? 'bg-[#D6BA73]/30' : 'bg-white/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D6BA73] flex items-center justify-center text-white">
                    {collab.photoUrl ? (
                      <img src={collab.photoUrl} alt="" className="w-full h-full rounded-full" />
                    ) : (
                      <span>{collab.username[0].toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {collab.isOwner && <Crown size={14} className="text-[#D6BA73]" />}
                      <span className="text-sm text-[#857E7B]">
                        {collab.username}
                        {collab.id === currentUserId && ' (вы)'}
                      </span>
                    </div>
                    {collab.isOwner && (
                      <span className="text-xs text-[#857E7B]/60">Владелец</span>
                    )}
                  </div>
                </div>
                {collab.currentAction && (
                  <span className="text-xs text-[#8BBF9F] bg-white/70 px-2 py-1 rounded-full">
                    {collab.currentAction}
                  </span>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Последние действия */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/30 rounded-3xl p-4 border-2 border-[#857E7B]/20"
      >
        <h3 className="text-[#857E7B] mb-3">Последние действия</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {activities.length === 0 ? (
            <p className="text-sm text-[#857E7B]/60 text-center py-4">
              Пока нет активности
            </p>
          ) : (
            activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex justify-between items-start text-sm p-3 rounded-xl bg-white/50"
              >
                <div className="flex-1">
                  <span className="text-[#857E7B]">
                    {activity.user && <span className="opacity-70">{activity.user}: </span>}
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs text-[#857E7B]/60 whitespace-nowrap ml-2">
                  {new Date(activity.time).toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
