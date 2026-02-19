import React, { useState } from 'react';
import { TimeControl, PRESETS } from '../types';

interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (control: TimeControl) => void;
  currentControl: TimeControl;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ isOpen, onClose, onSelect, currentControl }) => {
  const [customBaseMin, setCustomBaseMin] = useState(5);
  const [customIncSec, setCustomIncSec] = useState(0);
  if (!isOpen) return null;
  const handleCustomApply = () => {
    const totalSec = customBaseMin * 60;
    if (totalSec <= 0) return;
    onSelect({ id: 'custom', name: 'Custom', baseSeconds: totalSec, incrementSeconds: customIncSec, isCustom: true });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-neutral-900 border-t sm:border border-neutral-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Time Controls</h2>
          <button onClick={onClose} className="p-2 bg-neutral-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-4">Standard Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map(preset => (
                <button key={preset.id} onClick={() => onSelect(preset)} className={`p-4 rounded-2xl text-left border transition-all active:scale-95 ${currentControl.id === preset.id ? 'bg-blue-600 border-blue-400 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500'}`}>
                  <div className="text-lg font-bold">{preset.name}</div>
                  <div className="text-xs opacity-70">{Math.floor(preset.baseSeconds / 60)}m + {preset.incrementSeconds}s</div>
                </button>
              ))}
            </div>
          </section>
          <section className="bg-neutral-800/50 p-6 rounded-3xl border border-neutral-700">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-6">Custom Time</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Base Minutes</label>
                <input type="range" min="1" max="180" value={customBaseMin} onChange={(e) => setCustomBaseMin(parseInt(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                <div className="mt-2 text-2xl font-bold">{customBaseMin} min</div>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Increment Seconds</label>
                <input type="range" min="0" max="60" value={customIncSec} onChange={(e) => setCustomIncSec(parseInt(e.target.value))} className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                <div className="mt-2 text-2xl font-bold">{customIncSec} sec</div>
              </div>
              <button onClick={handleCustomApply} className="w-full py-4 bg-white text-black font-bold rounded-2xl active:scale-95 transition-transform">Apply Custom Control</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default SettingsSheet;
