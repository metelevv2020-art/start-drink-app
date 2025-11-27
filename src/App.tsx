import React, { useState, useEffect } from 'react';
import { Activity } from './components/ActivityLog';
import { ActionModal } from './components/ActionModal';
import { FeedingModal } from './components/FeedingModal';
import { TabNavigation, TabType } from './components/TabNavigation';
import { HomeTab } from './components/HomeTab';
import { UsersTab } from './components/UsersTab';
import { SettingsTab } from './components/SettingsTab';
import { useTelegram } from './hooks/useTelegram';

type PetState = 'happy' | 'hungry' | 'dirty' | 'wet' | 'sleeping' | 'sick' | 'baby' | 'adult';

interface PetNeeds {
  hunger: number;
  cleanliness: number;
  happiness: number;
  energy: number;
  health: number;
}

interface Collaborator {
  id: string;
  username: string;
  isOwner: boolean;
  currentAction?: string;
  photoUrl?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [petName, setPetName] = useState('Пушок');
  const [petAge, setPetAge] = useState(7);
  const [petState, setPetState] = useState<PetState>('happy');
  const [needs, setNeeds] = useState<PetNeeds>({
    hunger: 75,
    cleanliness: 80,
    happiness: 85,
    energy: 70,
    health: 90,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);

  const { user, hapticFeedback, hapticNotification, shareLink, isInTelegram } = useTelegram();

  // Симуляция соопекунов
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  // Инициализация пользователя из Telegram
  useEffect(() => {
    if (user) {
      const telegramUser: Collaborator = {
        id: user.id.toString(),
        username: user.username || user.first_name,
        isOwner: true,
        photoUrl: user.photo_url,
      };
      setCollaborators([telegramUser]);
    } else {
      // Демо пользователи если не в Telegram
      setCollaborators([
        { id: '1', username: '@user1', isOwner: true, currentAction: undefined },
        { id: '2', username: '@user2', isOwner: false, currentAction: undefined },
      ]);
    }
  }, [user]);

  // Автоматическое снижение потребностей
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSleeping) {
        setNeeds(prev => ({
          hunger: Math.max(0, prev.hunger - 0.5),
          cleanliness: Math.max(0, prev.cleanliness - 0.3),
          happiness: Math.max(0, prev.happiness - 0.2),
          energy: Math.max(0, prev.energy - 0.4),
          health: Math.max(0, Math.min(100, (prev.hunger + prev.cleanliness + prev.happiness + prev.energy) / 4)),
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isSleeping]);

  // Определение состояния питомца
  useEffect(() => {
    if (isSleeping) {
      setPetState('sleeping');
    } else if (needs.health < 30) {
      setPetState('sick');
    } else if (needs.hunger < 30) {
      setPetState('hungry');
    } else if (needs.cleanliness < 30) {
      setPetState('dirty');
    } else if (needs.energy < 20) {
      setPetState('sleeping');
    } else if (petAge < 3) {
      setPetState('baby');
    } else {
      setPetState('happy');
    }
  }, [needs, isSleeping, petAge]);

  // Старение питомца
  useEffect(() => {
    const ageInterval = setInterval(() => {
      setPetAge(prev => prev + 1);
    }, 60000); // Каждую минуту

    return () => clearInterval(ageInterval);
  }, []);

  const addActivity = (action: string, user?: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      action,
      time: new Date(),
      user,
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleAction = (action: string) => {
    hapticFeedback?.('light');
    setActiveModal(action);
  };

  const handleFeed = (food: { name: string; hungerValue: number }) => {
    setNeeds(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + food.hungerValue),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    addActivity(`Покормил(а) ${food.name}`);
    hapticNotification?.('success');
    setActiveModal(null);
  };

  const handleWash = () => {
    setPetState('wet');
    setNeeds(prev => ({
      ...prev,
      cleanliness: 100,
      happiness: Math.min(100, prev.happiness + 10),
    }));
    addActivity('Искупал(а) питомца');
    hapticNotification?.('success');
    setActiveModal(null);
    
    setTimeout(() => {
      setPetState('happy');
    }, 3000);
  };

  const handlePlay = () => {
    setNeeds(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15),
    }));
    addActivity('Поиграл(а) с питомцем');
    hapticNotification?.('success');
    setActiveModal(null);
  };

  const handleSleep = () => {
    setIsSleeping(true);
    setPetState('sleeping');
    addActivity('Уложил(а) спать');
    setActiveModal(null);
    
    const sleepInterval = setInterval(() => {
      setNeeds(prev => ({
        ...prev,
        energy: Math.min(100, prev.energy + 5),
      }));
    }, 1000);

    setTimeout(() => {
      setIsSleeping(false);
      clearInterval(sleepInterval);
      addActivity('Проснулся');
    }, 10000);
  };

  const handleHeal = () => {
    setNeeds(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 30),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    addActivity('Вылечил(а) питомца');
    hapticNotification?.('success');
    setActiveModal(null);
  };

  const handleShare = () => {
    const shareText = `Помоги мне ухаживать за ${petName}! 🐭`;
    const url = window.location.href;
    
    if (isInTelegram && shareLink) {
      shareLink(shareText, url);
      addActivity('Отправлено приглашение');
    } else if (navigator.share) {
      navigator.share({
        title: 'Пригласить друга',
        text: shareText,
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText + ' ' + url);
      addActivity('Скопирована ссылка приглашения');
    }
    hapticFeedback?.('medium');
  };

  const handleTabChange = (tab: TabType) => {
    hapticFeedback?.('light');
    setActiveTab(tab);
  };

  const handleNameChange = (newName: string) => {
    setPetName(newName);
    addActivity(`Изменено имя на ${newName}`);
    hapticNotification?.('success');
  };

  return (
    <div className="min-h-screen bg-[#F5E0B7] p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Контент вкладок */}
        {activeTab === 'home' && (
          <HomeTab
            petName={petName}
            petAge={petAge}
            petState={petState}
            needs={needs}
            isSleeping={isSleeping}
            onAction={handleAction}
            onShare={handleShare}
          />
        )}

        {activeTab === 'users' && (
          <UsersTab
            collaborators={collaborators}
            currentUserId={collaborators[0]?.id || '1'}
            activities={activities}
            onShare={handleShare}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            petName={petName}
            onNameChange={handleNameChange}
          />
        )}

        {/* Модалка кормления */}
        <ActionModal
          isOpen={activeModal === 'feed'}
          onClose={() => setActiveModal(null)}
          title="Чем покормить?"
        >
          <FeedingModal onFeed={handleFeed} />
        </ActionModal>

        {/* Модалка мытья */}
        <ActionModal
          isOpen={activeModal === 'wash'}
          onClose={() => setActiveModal(null)}
          title="Искупать питомца"
        >
          <div className="space-y-4">
            <p className="text-[#857E7B] text-center">
              {petName} будет чистым и счастливым! 🫧
            </p>
            <button
              onClick={handleWash}
              className="w-full py-3 bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 rounded-2xl text-white transition-colors"
            >
              Начать купание
            </button>
          </div>
        </ActionModal>

        {/* Модалка игры */}
        <ActionModal
          isOpen={activeModal === 'play'}
          onClose={() => setActiveModal(null)}
          title="Поиграть с питомцем"
        >
          <div className="space-y-4">
            <p className="text-[#857E7B] text-center">
              {petName} обожает играть! Это повысит настроение! 🎮
            </p>
            <button
              onClick={handlePlay}
              className="w-full py-3 bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 rounded-2xl text-white transition-colors"
            >
              Начать игру
            </button>
          </div>
        </ActionModal>

        {/* Модалка сна */}
        <ActionModal
          isOpen={activeModal === 'sleep'}
          onClose={() => setActiveModal(null)}
          title="Уложить спать"
        >
          <div className="space-y-4">
            <p className="text-[#857E7B] text-center">
              {petName} отдохнёт и восстановит энергию 💤
            </p>
            <button
              onClick={handleSleep}
              className="w-full py-3 bg-[#D6BA73] hover:bg-[#D6BA73]/90 rounded-2xl text-[#857E7B] transition-colors"
            >
              Уложить спать
            </button>
          </div>
        </ActionModal>

        {/* Модалка лечения */}
        <ActionModal
          isOpen={activeModal === 'heal'}
          onClose={() => setActiveModal(null)}
          title="Вылечить питомца"
        >
          <div className="space-y-4">
            <p className="text-[#857E7B] text-center">
              Дать лекарство и позаботиться о здоровье {petName} 💊
            </p>
            <button
              onClick={handleHeal}
              className="w-full py-3 bg-[#8BBF9F] hover:bg-[#8BBF9F]/90 rounded-2xl text-white transition-colors"
            >
              Дать лекарство
            </button>
          </div>
        </ActionModal>
      </div>

      {/* Навигация */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;
