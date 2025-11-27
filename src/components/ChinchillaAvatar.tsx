import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

type PetState = 'happy' | 'hungry' | 'dirty' | 'wet' | 'sleeping' | 'sick' | 'baby' | 'adult';

interface ChinchillaAvatarProps {
  state: PetState;
  size?: number;
}

export function ChinchillaAvatar({ state, size = 256 }: ChinchillaAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = size / 256;
    ctx.clearRect(0, 0, size, size);
    ctx.scale(scale, scale);

    // Базовые цвета
    const bodyColor = '#8B8B8B';
    const darkGray = '#5A5A5A';
    const lightGray = '#A5A5A5';
    const pink = '#FFB6C1';
    const white = '#FFFFFF';
    const brown = '#4A3728';

    // Тело
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(128, 160, 70, 85, 0, 0, Math.PI * 2);
    ctx.fill();

    // Живот
    ctx.fillStyle = lightGray;
    ctx.beginPath();
    ctx.ellipse(128, 175, 45, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Левое ухо
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(90, 80, 25, 45, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pink;
    ctx.beginPath();
    ctx.ellipse(90, 85, 15, 30, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Правое ухо
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(166, 80, 25, 45, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = pink;
    ctx.beginPath();
    ctx.ellipse(166, 85, 15, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Голова
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(128, 110, 55, 0, Math.PI * 2);
    ctx.fill();

    // Глаза - зависят от состояния
    if (state === 'sleeping') {
      // Закрытые глаза
      ctx.strokeStyle = brown;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(110, 105, 8, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(146, 105, 8, 0, Math.PI);
      ctx.stroke();
    } else {
      // Белки глаз
      ctx.fillStyle = white;
      ctx.beginPath();
      ctx.arc(110, 105, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(146, 105, 12, 0, Math.PI * 2);
      ctx.fill();

      // Зрачки
      ctx.fillStyle = brown;
      const pupilSize = state === 'hungry' ? 10 : 8;
      ctx.beginPath();
      ctx.arc(110, 105, pupilSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(146, 105, pupilSize, 0, Math.PI * 2);
      ctx.fill();

      // Блики
      ctx.fillStyle = white;
      ctx.beginPath();
      ctx.arc(112, 102, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(148, 102, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Нос
    ctx.fillStyle = darkGray;
    ctx.beginPath();
    ctx.arc(128, 120, 5, 0, Math.PI * 2);
    ctx.fill();

    // Рот - зависит от состояния
    ctx.strokeStyle = brown;
    ctx.lineWidth = 2;
    if (state === 'happy' || state === 'adult') {
      ctx.beginPath();
      ctx.arc(128, 125, 8, 0, Math.PI);
      ctx.stroke();
    } else if (state === 'sick') {
      ctx.beginPath();
      ctx.arc(128, 130, 8, Math.PI, 0);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(120, 128);
      ctx.lineTo(136, 128);
      ctx.stroke();
    }

    // Щёки
    ctx.fillStyle = pink;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(88, 115, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(168, 115, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Усы
    ctx.strokeStyle = darkGray;
    ctx.lineWidth = 1.5;
    // Левые усы
    ctx.beginPath();
    ctx.moveTo(90, 115);
    ctx.lineTo(50, 110);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(90, 120);
    ctx.lineTo(50, 120);
    ctx.stroke();
    // Правые усы
    ctx.beginPath();
    ctx.moveTo(166, 115);
    ctx.lineTo(206, 110);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(166, 120);
    ctx.lineTo(206, 120);
    ctx.stroke();

    // Левая лапка
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(85, 200, 18, 25, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Правая лапка
    ctx.beginPath();
    ctx.ellipse(171, 200, 18, 25, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Хвост
    ctx.fillStyle = darkGray;
    ctx.beginPath();
    ctx.ellipse(180, 190, 45, 25, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Дополнительные элементы в зависимости от состояния
    if (state === 'hungry') {
      // Миска
      ctx.fillStyle = '#D6BA73';
      ctx.beginPath();
      ctx.ellipse(128, 235, 30, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#857E7B';
      ctx.fillRect(98, 225, 60, 10);
    } else if (state === 'dirty') {
      // Пятна грязи
      ctx.fillStyle = '#6B5D52';
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(140, 130, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(100, 170, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(160, 180, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (state === 'wet') {
      // Капли воды
      ctx.fillStyle = '#4A90E2';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(100, 140, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(150, 150, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(130, 170, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (state === 'sleeping') {
      // Zzz
      ctx.fillStyle = '#857E7B';
      ctx.font = '20px Arial';
      ctx.fillText('Z', 180, 80);
      ctx.font = '16px Arial';
      ctx.fillText('z', 190, 95);
      ctx.font = '12px Arial';
      ctx.fillText('z', 197, 105);
    } else if (state === 'sick') {
      // Повязка на голове
      ctx.fillStyle = white;
      ctx.fillRect(90, 95, 76, 12);
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.moveTo(128, 97);
      ctx.lineTo(133, 102);
      ctx.lineTo(128, 107);
      ctx.lineTo(123, 102);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(126, 97, 4, 10);
    } else if (state === 'baby') {
      // Уменьшенная версия - уже отрисовано меньше
      ctx.font = '16px Arial';
      ctx.fillText('🍼', 170, 130);
    }

    // Если держит еду (happy/adult)
    if (state === 'happy' || state === 'adult') {
      // Печенька в лапках
      ctx.fillStyle = '#D6BA73';
      ctx.beginPath();
      ctx.arc(128, 180, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#857E7B';
      ctx.beginPath();
      ctx.arc(122, 175, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(134, 175, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(128, 185, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [state, size]);

  const getAnimation = () => {
    switch (state) {
      case 'happy':
        return {
          y: [0, -10, 0],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        };
      case 'sleeping':
        return {
          scale: [1, 1.02, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case 'wet':
        return {
          rotate: [-2, 2, -2],
          transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
        };
      default:
        return {};
    }
  };

  return (
    <motion.canvas
      ref={canvasRef}
      width={size}
      height={size}
      animate={getAnimation()}
      className="max-w-full h-auto"
    />
  );
}
