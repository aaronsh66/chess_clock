import React, { useState } from 'react';
import { Player, GameState, TimeControl } from './types';
import { useChessClock } from './hooks/useChessClock';
import ClockHalf from './components/ClockHalf';
import ControlsOverlay from './components/ControlsOverlay';
import SettingsSheet from './components/SettingsSheet';

const App: React.FC = () => {
  const { gameState, activePlayer, timeTop, timeBottom, flaggedPlayer, timeControl, handleTap, togglePause, resetGame } = useChessClock();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const handleSelectTimeControl = (ctrl: TimeControl) => { resetGame(ctrl); setIsSettingsOpen(false); };

  return (
    <div className="h-screen-safe w-full flex flex-col bg-black overflow-hidden select-none">
      <ClockHalf player={Player.TOP} time={timeTop} isActive={activePlayer === Player.TOP && gameState === GameState.RUNNING} isFlagged={flaggedPlayer === Player.TOP} isPaused={gameState === GameState.PAUSED} isReady={gameState === GameState.READY} isOpponentActive={activePlayer === Player.BOTTOM && gameState === GameState.RUNNING} onTap={() => handleTap(Player.TOP)} />
      <ControlsOverlay gameState={gameState} onPause={togglePause} onReset={() => resetGame()} onOpenSettings={() => setIsSettingsOpen(true)} />
      <ClockHalf player={Player.BOTTOM} time={timeBottom} isActive={activePlayer === Player.BOTTOM && gameState === GameState.RUNNING} isFlagged={flaggedPlayer === Player.BOTTOM} isPaused={gameState === GameState.PAUSED} isReady={gameState === GameState.READY} isOpponentActive={activePlayer === Player.TOP && gameState === GameState.RUNNING} onTap={() => handleTap(Player.BOTTOM)} />
      <SettingsSheet isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} onSelect={handleSelectTimeControl} currentControl={timeControl} />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-800 pointer-events-none" />
    </div>
  );
};
export default App;
