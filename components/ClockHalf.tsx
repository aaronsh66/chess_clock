import React from 'react';
import { Player, GameState } from '../types';
import { formatTime } from '../utils';

interface ClockHalfProps {
  player: Player;
  time: number;
  isActive: boolean;
  isFlagged: boolean;
  isPaused: boolean;
  isReady: boolean;
  isOpponentActive: boolean;
  onTap: () => void;
}

const ClockHalf: React.FC<ClockHalfProps> = ({ player, time, isActive, isFlagged, isPaused, isReady, isOpponentActive, onTap }) => {
  const isTop = player === Player.TOP;
  let bgColor = 'bg-neutral-900';
  let textColor = 'text-neutral-400';
  if (isFlagged) { bgColor = 'bg-red-600'; textColor = 'text-white'; }
  else if (isActive) { bgColor = 'bg-blue-600'; textColor = 'text-white'; }
  else if (isReady || isPaused) textColor = 'text-neutral-200';
  else if (isOpponentActive) { bgColor = 'bg-neutral-800'; textColor = 'text-neutral-500'; }

  return (
    <button
      onClick={onTap}
      disabled={isOpponentActive && !isReady}
      className={`relative w-full flex-1 flex flex-col items-center justify-center transition-colors duration-200 active:opacity-80 ${bgColor} ${isTop ? 'rotate-180' : ''} ${!isReady && !isActive && !isPaused && !isFlagged ? 'opacity-70' : 'opacity-100'}`}
    >
      <div
        className="absolute top-8 text-xs font-bold tracking-widest opacity-40 uppercase"
        style={{ transform: isTop ? 'translateY(100%)' : 'translateY(100%)', transformOrigin: 'center' }}
      >
        {isFlagged ? 'TIME EXPIRED' : isActive ? 'RUNNING' : isPaused ? 'PAUSED' : isReady ? 'TAP TO START' : ''}
      </div>
      <div className={`text-7xl md:text-9xl font-bold tabular-nums ${textColor}`}>{formatTime(time)}</div>
      {isFlagged && <div className="mt-4 bg-white text-red-600 px-4 py-1 rounded-full font-bold animate-pulse">FLAG</div>}
    </button>
  );
};
export default ClockHalf;
