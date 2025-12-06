import React, { useState, useEffect } from 'react';
import { Job } from '../types';

interface BattleProps {
  job: Job;
  onClose: () => void;
}

const PlayerBackSprite = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" className="pixel-art">
    <path d="M22 18 h20 v20 h-20 z" fill="#ffcc99" />
    <path d="M18 38 h28 l4 4 v22 h-36 v-22 z" fill="#3498db" />
    <path d="M14 38 l4 4 v12 h-4 z" fill="#2980b9" />
    <path d="M46 38 l4 4 v12 h-4 z" fill="#2980b9" />
    <path d="M20 22 h2 v6 h-2 z" fill="#eebb99" opacity="0.5" />
    <path d="M42 22 h2 v6 h-2 z" fill="#eebb99" opacity="0.5" />
  </svg>
);

const TotemSprite = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" className="pixel-art">
    <rect x="20" y="50" width="24" height="10" fill="#2d5a27" />
    <rect x="24" y="10" width="16" height="40" fill="#8B4513" />
    <path d="M10 20 l14 5 v-10 z" fill="#A0522D" />
    <path d="M54 20 l-14 5 v-10 z" fill="#A0522D" />
    <rect x="26" y="16" width="4" height="4" fill="#000" />
    <rect x="34" y="16" width="4" height="4" fill="#000" />
    <rect x="28" y="24" width="8" height="2" fill="#e74c3c" />
    <rect x="26" y="30" width="12" height="4" fill="#CD853F" />
  </svg>
);

const TentSprite = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" className="pixel-art">
    <path d="M32 10 L10 50 L54 50 Z" fill="#e67e22" stroke="#d35400" strokeWidth="2" />
    <path d="M32 10 L32 50" stroke="#d35400" strokeWidth="2" />
    <path d="M28 35 L32 30 L36 35 L36 50 L28 50 Z" fill="#2c3e50" />
    <rect x="8" y="50" width="48" height="4" fill="#27ae60" />
  </svg>
);

const CameraSprite = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" className="pixel-art">
    <path d="M24 40 l-8 20" stroke="#7f8c8d" strokeWidth="3" />
    <path d="M40 40 l8 20" stroke="#7f8c8d" strokeWidth="3" />
    <path d="M32 40 l0 20" stroke="#7f8c8d" strokeWidth="3" />
    <rect x="18" y="20" width="28" height="20" fill="#2c3e50" rx="2" />
    <circle cx="32" cy="30" r="8" fill="#34495e" stroke="#000" strokeWidth="1" />
    <circle cx="32" cy="30" r="3" fill="#3498db" opacity="0.8" />
    <rect x="40" y="14" width="8" height="6" fill="#95a5a6" />
    <circle cx="42" cy="24" r="2" fill="#e74c3c" className="animate-pulse" />
  </svg>
);

const CompassSprite = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" className="pixel-art">
    <rect x="8" y="8" width="48" height="40" fill="#f1c40f" rx="2" stroke="#d35400" strokeWidth="2" />
    <path d="M18 18 l10 10 l10 -5" fill="none" stroke="#e74c3c" strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="38" cy="23" r="3" fill="#c0392b" />
    <circle cx="48" cy="48" r="14" fill="#ecf0f1" stroke="#2c3e50" strokeWidth="2" />
    <path d="M48 38 l4 10 l-4 10 l-4 -10 z" fill="#e74c3c" />
    <circle cx="48" cy="48" r="2" fill="#000" />
  </svg>
);

const ClapperboardSprite = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" className="pixel-art">
    <rect x="12" y="28" width="40" height="28" fill="#2c3e50" stroke="#ecf0f1" strokeWidth="2" />
    <rect x="16" y="34" width="32" height="2" fill="#7f8c8d" />
    <rect x="16" y="42" width="32" height="2" fill="#7f8c8d" />
    <rect x="12" y="18" width="40" height="8" fill="#ecf0f1" transform="rotate(-15 12 28)" stroke="#2c3e50" strokeWidth="2" />
    <path d="M18 16 l-2 8" stroke="#2c3e50" strokeWidth="2" transform="rotate(-15 12 28)" />
    <path d="M28 14 l-2 8" stroke="#2c3e50" strokeWidth="2" transform="rotate(-15 12 28)" />
    <path d="M38 12 l-2 8" stroke="#2c3e50" strokeWidth="2" transform="rotate(-15 12 28)" />
  </svg>
);

const Battle: React.FC<BattleProps> = ({ job, onClose }) => {
  const [phase, setPhase] = useState<'encounter' | 'details' | 'caught'>('encounter');

  const handleNext = () => {
    if (phase === 'encounter') setPhase('details');
    else if (phase === 'details') setPhase('caught');
    else onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleNext();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, onClose]);

  const renderJobSprite = () => {
    switch (job.id) {
      case 'job1': return <TotemSprite />;
      case 'job2': return <TentSprite />;
      case 'job3': return <CameraSprite />;
      case 'job4': return <CompassSprite />;
      default: return <ClapperboardSprite />;
    }
  };

  return (
    <div className="absolute inset-0 bg-[#f0f8f0] flex flex-col z-30 font-['Press_Start_2P']">
       <div className="flex-1 relative bg-[#f0f8f0] flex flex-col overflow-hidden">
          
          <div className="absolute top-3 left-4 z-10 bg-[#f8f8f8] border-2 border-[#202020] px-2 py-2 rounded-tl-lg shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
             <div className="flex flex-col gap-1 min-w-[120px]">
                <div className="text-[#202020] font-bold text-[10px] sm:text-xs uppercase flex justify-between">
                   <span>{job.company.substring(0, 10)}</span>
                </div>
                <div className="flex items-center justify-end gap-1 mb-1">
                   <span className="text-[10px] font-bold">:L50</span>
                </div>
                <div className="flex items-center gap-1 bg-[#202020] p-[1px] rounded-[2px] ml-4">
                   <div className="text-[8px] text-[#f6d7b0] font-bold bg-[#202020] px-1">HP</div>
                   <div className="flex-1 h-2 bg-[#f0f8f0] w-16 sm:w-24">
                      <div className="h-full bg-[#306230] w-[80%] border-r border-[#f0f8f0]"></div>
                   </div>
                </div>
             </div>
             <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-[#202020] transform rotate-180 -ml-[2px] -mb-[2px]"></div>
          </div>

          <div className="absolute top-[46%] right-8 w-32 h-8 bg-[#d0e0d0] rounded-[50%] z-0"></div>
          
          <div className="absolute top-[20%] right-10 z-10 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm">
             {renderJobSprite()}
          </div>

          <div className="absolute bottom-[4%] left-6 w-40 h-10 bg-[#d0e0d0] rounded-[50%] z-0"></div>
          
          <div className="absolute bottom-[6%] left-10 z-10 w-32 h-32 sm:w-40 sm:h-40">
             <PlayerBackSprite />
          </div>

          <div className="absolute bottom-[14%] right-4 bg-[#f8f8f8] border-2 border-[#202020] px-3 py-2 z-10 shadow-[4px_4px_0_rgba(0,0,0,0.1)] rounded-br-lg">
             <div className="flex flex-col gap-1 min-w-[130px]">
                <div className="text-[#202020] font-bold text-[10px] sm:text-xs uppercase flex justify-between">
                  <span>VALENTIN</span>
                </div>
                 <div className="flex items-center justify-end gap-1 mb-1">
                   <span className="text-[10px] font-bold">:L99</span>
                </div>
                <div className="flex items-center gap-1 bg-[#202020] p-[1px] rounded-[2px] ml-4">
                   <div className="text-[8px] text-[#f6d7b0] font-bold bg-[#202020] px-1">HP</div>
                   <div className="flex-1 h-2 bg-[#f0f8f0] w-16 sm:w-24">
                      <div className="h-full bg-[#306230] w-full border-r border-[#f0f8f0]"></div>
                   </div>
                </div>
                <div className="text-right text-[10px] font-bold text-[#202020] mt-1 tracking-widest">
                  100/100
                </div>
             </div>
             <div className="absolute top-0 right-0 w-0 h-0 border-r-[10px] border-r-transparent border-t-[10px] border-t-[#202020] transform rotate-180 -mr-[2px] -mt-[2px]"></div>
          </div>
       </div>

       <div className="h-32 bg-[#202020] p-[2px] shrink-0">
         <div className="h-full border-4 border-[#f8f8f8] p-[2px]">
            <div className="h-full bg-[#fff] border-2 border-[#202020] p-4 relative cursor-pointer" onClick={handleNext}>
                {phase === 'encounter' && (
                  <p className="text-[#202020] text-[10px] sm:text-xs leading-5 sm:leading-6 uppercase">
                    Wild <span className="font-bold">{job.company}</span> appeared!
                    <br/>
                    Role: {job.title}
                  </p>
                )}
                {phase === 'details' && (
                  <div className="text-[#202020] text-[8px] sm:text-[10px] leading-4 sm:leading-5">
                    <p className="font-bold mb-1 uppercase text-xs">{job.period}</p>
                    <ul className="list-none">
                      {job.details.slice(0, 3).map((d, i) => (
                        <li key={i} className="mb-1">- {d}</li>
                      ))}
                    </ul>
                  </div>
                )}
                 {phase === 'caught' && (
                  <p className="text-[#202020] text-[10px] sm:text-xs leading-5 sm:leading-6 uppercase">
                    Valentin is learning <span className="font-bold">A NEW SKILL</span>!
                    <br/>
                    It's super effective!
                    <br/>
                    Experience gained!
                  </p>
                )}
                
                <div className="absolute bottom-2 right-2 text-[#e74c3c] animate-bounce text-sm">▼</div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default Battle;