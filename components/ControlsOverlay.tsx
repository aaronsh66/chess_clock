import React from 'react';
import { GameState } from '../types';

interface ControlsOverlayProps {
  gameState: GameState;
  onPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

const ControlsOverlay: React.FC<ControlsOverlayProps> = ({ gameState, onPause, onReset, onOpenSettings }) => {
  const isRunning = gameState === GameState.RUNNING;
  const isReady = gameState === GameState.READY;
  const isEnded = gameState === GameState.ENDED;
  return (
    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-center items-center pointer-events-none z-10">
      <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-full px-4 py-2 flex items-center gap-6 pointer-events-auto shadow-2xl">
        <button onClick={onReset} aria-label="New Game" className="p-3 text-white hover:text-red-400 transition-colors active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
        <button disabled={isReady || isEnded} onClick={onPause} aria-label={isRunning ? 'Pause' : 'Resume'} className={`p-4 rounded-full transition-all active:scale-95 ${(isReady || isEnded) ? 'text-neutral-700' : 'text-white hover:text-blue-400'}`}>
          {isRunning ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
        </button>
        <button onClick={onOpenSettings} aria-label="Settings" className="p-3 text-white hover:text-yellow-400 transition-colors active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
  );
};
export default ControlsOverlay;
