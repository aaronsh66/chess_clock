
export const formatTime = (seconds: number): string => {
  const s = Math.max(0, Math.ceil(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const remS = s % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(remS)}`;
  }
  return `${pad(m)}:${pad(remS)}`;
};

export const triggerHaptic = (type: 'light' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    if (type === 'heavy') {
      navigator.vibrate([100, 30, 100]);
    } else {
      navigator.vibrate(15);
    }
  }
};

export const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to local storage', e);
  }
};

export const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
