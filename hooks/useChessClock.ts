import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Player, TimeControl, DEFAULT_TIME_CONTROL } from '../types';
import { triggerHaptic, saveToStorage, getFromStorage } from '../utils';

export const useChessClock = () => {
  const [timeControl, setTimeControl] = useState<TimeControl>(() =>
    getFromStorage('chess-clock-settings', DEFAULT_TIME_CONTROL)
  );
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [activePlayer, setActivePlayer] = useState<Player>(Player.NONE);
  const [timeTop, setTimeTop] = useState<number>(timeControl.baseSeconds);
  const [timeBottom, setTimeBottom] = useState<number>(timeControl.baseSeconds);
  const [flaggedPlayer, setFlaggedPlayer] = useState<Player>(Player.NONE);
  const lastTickRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);

  const resetGame = useCallback((newControl?: TimeControl) => {
    const ctrl = newControl || timeControl;
    if (newControl) { setTimeControl(ctrl); saveToStorage('chess-clock-settings', ctrl); }
    setGameState(GameState.READY);
    setActivePlayer(Player.NONE);
    setTimeTop(ctrl.baseSeconds);
    setTimeBottom(ctrl.baseSeconds);
    setFlaggedPlayer(Player.NONE);
    if (timerIdRef.current) window.clearInterval(timerIdRef.current);
  }, [timeControl]);

  const tick = useCallback(() => {
    const now = Date.now();
    const delta = (now - lastTickRef.current) / 1000;
    lastTickRef.current = now;
    if (activePlayer === Player.TOP) {
      setTimeTop(prev => {
        const next = prev - delta;
        if (next <= 0) { setGameState(GameState.ENDED); setFlaggedPlayer(Player.TOP); triggerHaptic('heavy'); return 0; }
        return next;
      });
    } else if (activePlayer === Player.BOTTOM) {
      setTimeBottom(prev => {
        const next = prev - delta;
        if (next <= 0) { setGameState(GameState.ENDED); setFlaggedPlayer(Player.BOTTOM); triggerHaptic('heavy'); return 0; }
        return next;
      });
    }
  }, [activePlayer]);

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      lastTickRef.current = Date.now();
      timerIdRef.current = window.setInterval(tick, 50);
    } else { if (timerIdRef.current) window.clearInterval(timerIdRef.current); }
    return () => { if (timerIdRef.current) window.clearInterval(timerIdRef.current); };
  }, [gameState, tick]);

  const togglePause = useCallback(() => {
    if (gameState === GameState.RUNNING) setGameState(GameState.PAUSED);
    else if (gameState === GameState.PAUSED) setGameState(GameState.RUNNING);
  }, [gameState]);

  const handleTap = useCallback((player: Player) => {
    if (gameState === GameState.ENDED) return;
    if (gameState === GameState.READY) {
      triggerHaptic('light');
      if (player === Player.BOTTOM) setActivePlayer(Player.TOP);
      else setActivePlayer(Player.BOTTOM);
      setGameState(GameState.RUNNING);
      return;
    }
    if (gameState === GameState.RUNNING && player === activePlayer) {
      triggerHaptic('light');
      if (player === Player.TOP) { setTimeTop(t => t + timeControl.incrementSeconds); setActivePlayer(Player.BOTTOM); }
      else { setTimeBottom(t => t + timeControl.incrementSeconds); setActivePlayer(Player.TOP); }
    }
  }, [gameState, activePlayer, timeControl]);

  return { gameState, activePlayer, timeTop, timeBottom, flaggedPlayer, timeControl, handleTap, togglePause, resetGame };
};
