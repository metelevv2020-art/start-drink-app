import { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: any;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setParams: (params: any) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  openLink: (url: string) => void;
  openTelegramLink: (url: string) => void;
  shareMessage: (msg_id: string, callback?: () => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegram() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Установка цветов под наш дизайн
      tg.headerColor = '#F5E0B7';
      tg.backgroundColor = '#F5E0B7';
      
      setWebApp(tg);
      setUser(tg.initDataUnsafe?.user || null);
    }
  }, []);

  const hapticFeedback = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    webApp?.HapticFeedback?.impactOccurred(style);
  };

  const hapticNotification = (type: 'error' | 'success' | 'warning') => {
    webApp?.HapticFeedback?.notificationOccurred(type);
  };

  const shareToStory = (mediaUrl: string) => {
    if (webApp) {
      // Telegram Web App API для шаринга в сторис
      webApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(mediaUrl)}`);
    }
  };

  const shareLink = (text: string, url: string) => {
    if (webApp) {
      webApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    }
  };

  return {
    webApp,
    user,
    hapticFeedback,
    hapticNotification,
    shareToStory,
    shareLink,
    isInTelegram: !!webApp,
  };
}
