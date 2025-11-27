import React, { useState, useEffect } from 'react';
import './FluffyGame.css';

const FluffyGame: React.FC = () => {
  const [coins, setCoins] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [level, setLevel] = useState(1);
  const [petState, setPetState] = useState('happy');

  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness(prev => Math.max(0, prev - 2));
      setEnergy(prev => Math.max(0, prev - 1));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (happiness < 30) {
      setPetState('sad');
    } else if (energy < 20) {
      setPetState('tired');
    } else {
      setPetState('happy');
    }
  }, [happiness, energy]);

  useEffect(() => {
    if (coins >= level * 50) {
      setLevel(prev => prev + 1);
      setHappiness(100);
      setEnergy(100);
    }
  }, [coins, level]);

  const playWithPet = () => {
    if (energy > 15) {
      setHappiness(prev => Math.min(100, prev + 20));
      setEnergy(prev => Math.max(0, prev - 15));
      setCoins(prev => prev + 8);
    }
  };

  const feedPet = () => {
    if (coins >= 15) {
      setCoins(prev => prev - 15);
      setEnergy(prev => Math.min(100, prev + 30));
      setHappiness(prev => Math.min(100, prev + 10));
    }
  };

  const petPet = () => {
    setHappiness(prev => Math.min(100, prev + 10));
    setCoins(prev => prev + 3);
  };

  const getPetEmoji = () => {
    switch (petState) {
      case 'sad': return '😢';
      case 'tired': return '😴';
      default: return '🐶';
    }
  };

  return (
    <div className="fluffy-game">
      <div className="game-header">
        <h1>🐾 Fluffy Buddy</h1>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-icon">💰</span>
            <span className="stat-value">{coins}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❤️</span>
            <span className="stat-value">{happiness}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{Math.round(energy)}%</span>
          </div>
        </div>
      </div>

      <div className="pet-section">
        <div className={`pet ${petState}`}>
          <div className="pet-emoji">{getPetEmoji()}</div>
          <div className="pet-name">Fluffy</div>
        </div>
        
        <div className="status-bars">
          <div className="status-bar">
            <div className="status-label">Счастье</div>
            <div className="bar-container">
              <div 
                className="bar-fill happiness-bar" 
                style={{ width: `${happiness}%` }}
              ></div>
            </div>
          </div>
          <div className="status-bar">
            <div className="status-label">Энергия</div>
            <div className="bar-container">
              <div 
                className="bar-fill energy-bar" 
                style={{ width: `${energy}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions-grid">
        <button onClick={petPet} className="action-btn pet-btn" disabled={energy < 5}>
          <span className="btn-emoji">✨</span>
          <span className="btn-text">Гладить</span>
          <span className="btn-reward">+3 монеты</span>
        </button>
        
        <button onClick={playWithPet} className="action-btn play-btn" disabled={energy <= 15}>
          <span className="btn-emoji">🎾</span>
          <span className="btn-text">Играть</span>
          <span className="btn-reward">+8 монет</span>
        </button>
        
        <button onClick={feedPet} className="action-btn feed-btn" disabled={coins < 15}>
          <span className="btn-emoji">🍖</span>
          <span className="btn-text">Кормить</span>
          <span className="btn-cost">-15 монет</span>
        </button>
      </div>

      <div className="level-progress">
        <div className="progress-info">
          До {level + 1} уровня: {level * 50 - coins} монет
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(coins / (level * 50)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FluffyGame;