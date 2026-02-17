
export enum GameState {
  READY = 'ready',
  RUNNING = 'running',
  PAUSED = 'paused',
  ENDED = 'ended'
}

export enum Player {
  TOP = 'top',
  BOTTOM = 'bottom',
  NONE = 'none',
}

export interface TimeControl {
  id: string;
  name: string;
  baseSeconds: number;
  incrementSeconds: number;
  isCustom?: boolean;
}

export const PRESETS: TimeControl[] = [
  { id: '1-0', name: '1 min', baseSeconds: 60, incrementSeconds: 0 },
  { id: '2-1', name: '2 + 1', baseSeconds: 120, incrementSeconds: 1 },
  { id: '3-2', name: '3 + 2', baseSeconds: 180, incrementSeconds: 2 },
  { id: '5-0', name: '5 min', baseSeconds: 300, incrementSeconds: 0 },
  { id: '10-0', name: '10 min', baseSeconds: 600, incrementSeconds: 0 },
  { id: '15-10', name: '15 + 10', baseSeconds: 900, incrementSeconds: 10 },
];

export const DEFAULT_TIME_CONTROL = PRESETS[3]; // 5 min Blitz
