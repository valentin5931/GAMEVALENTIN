import React, { useState, useEffect, useRef } from 'react';
import { GameState, Job, Position } from './types';
import { RESUME } from './data/resumeData';
import { INITIAL_POS } from './utils/mapUtils';
import Overworld from './components/Overworld';
import Battle from './components/Battle';
import Menu from './components/Menu';
import ImageEditor from './components/ImageEditor';
import Takeoff from './components/Takeoff';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [visitedJobs, setVisitedJobs] = useState<Set<string>>(new Set());
  const [playerPos, setPlayerPos] = useState<Position>(INITIAL_POS);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const startOver = () => {
    setGameState(GameState.OVERWORLD);
    setVisitedJobs(new Set());
    setCurrentJob(null);
    setPlayerPos(INITIAL_POS);
  };

  const handleEncounter = (job: Job) => {
    if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
    setCurrentJob(job);
    setGameState(GameState.BATTLE);
    setVisitedJobs(prev => new Set(prev).add(job.id));
  };

  const simKey = (key: string, type: 'keydown' | 'keyup') => {
      window.dispatchEvent(new KeyboardEvent(type, { key }));
  };

  // --- LOGIQUE TURBO & JOYSTICK ---
  const intervalRef = useRef<number | null>(null);
  const dpadRef = useRef<HTMLDivElement>(null);

  const startMoving = (key: string) => {
    if (activeKey !== key && navigator.vibrate) navigator.vibrate(10);
    setActiveKey(key);
    simKey(key, 'keydown');
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      simKey(key, 'keydown');
    }, 100);
  };

  const stopMoving = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].forEach(k => simKey(k, 'keyup'));
    setActiveKey(null);
  };

  const handlePadMove = (e: React.PointerEvent) => {
    // Empêche absolument tout comportement par défaut
    e.preventDefault();
    e.stopPropagation();
    
    if (!dpadRef.current) return;

    // IMPORTANT : Capture le pointeur pour que le glissement marche même si on sort de la div
    try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {
        // Ignorer si capture échoue
    }

    const rect = dpadRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    // Zone morte au centre (15px)
    if (Math.abs(x) < 15 && Math.abs(y) < 15) {
        stopMoving();
        return;
    }

    let newKey = '';
    // Détection de l'angle pour savoir quelle direction activer
    if (Math.abs(x) > Math.abs(y)) {
        newKey = x > 0 ? 'ArrowRight' : 'ArrowLeft';
    } else {
        newKey = y > 0 ? 'ArrowDown' : 'ArrowUp';
    }

    if (newKey !== activeKey) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (activeKey) simKey(activeKey, 'keyup');
        startMoving(newKey);
    }
  };
  // --------------------------------

  const DPadVisual = ({ direction, k, style }: { direction: string, k: string, style: string }) => {
      const isActive = activeKey === k;
      return (
        <div className={`absolute ${style} transition-colors duration-75 pointer-events-none rounded-sm ${isActive ? 'bg-[#151515]' : ''}`} />
      );
  };

  const ActionBtn = ({ label, k, color }: { label: string, k: string, color: string }) => (
      <div className="flex flex-col items-center gap-1 transform active:translate-y-[2px]">
          <button
              className={`w-14 h-14 sm:w-10 sm:h-10 rounded-full shadow-lg border-b-4 ${color} border-opacity-40 active:border-b-0 outline-none`}
              style={{ borderColor: 'rgba(0,0,0,0.3)', touchAction: 'none' }}
              onPointerDown={(e) => { 
                e.preventDefault();
                e.stopPropagation();
                if (navigator.vibrate) navigator.vibrate(15);
                simKey(k, 'keydown'); 
              }}
              onPointerUp={(e) => { e.preventDefault(); simKey(k, 'keyup'); }}
              onPointerLeave={(e) => { e.preventDefault(); simKey(k, 'keyup'); }}
              onContextMenu={(e) => e.preventDefault()}
          />
          <span className="font-bold text-[#303080] text-[10px] sm:text-[10px] select-none pointer-events-none">{label}</span>
      </div>
  );

  return (
    <div 
        className="w-full h-[100dvh] bg-[#202020] flex items-center justify-center overflow-hidden font-sans fixed inset-0"
        onContextMenu={(e) => e.preventDefault()} // Bloque le clic droit global
    >
      {/* SOLUTION RADICALE POUR IPHONE : CSS INJECTÉ */}
      <style>{`
        * {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -khtml-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-tap-highlight-color: transparent !important;
            touch-action: none !important;
        }
        /* On réactive le clic uniquement pour les liens externes */
        a { pointer-events: auto; cursor: pointer; }
      `}</style>

      <div className="relative w-full h-full sm:h-[95vh] max-w-lg bg-[#c0c0c0] sm:rounded-t-xl sm:rounded-b-[40px] shadow-2xl flex flex-col border-b-8 border-r-8 border-[#909090]">
          
          <div className="bg-[#707070] p-1 sm:p-3 sm:rounded-t-lg sm:rounded-b-[30px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative flex flex-col items-center flex-1 min-h-0">
             
             <div className="w-full flex justify-between items-center mb-0.5 px-3 shrink-0">
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_5px_red] hidden sm:block"></div>
                     <div className="text-[#b0b0b0] text-[5px] font-bold tracking-widest hidden sm:block italic">BATTERY</div>
                 </div>
                 <div className="text-[#808080] text-[5px] font-bold tracking-widest hidden sm:block">DOT MATRIX WITH STEREO SOUND</div>
             </div>
             
             <div className="bg-[#f0f8f0] w-full flex-1 border-4 border-[#505050] shadow-inner overflow-hidden relative font-['Press_Start_2P']">
               <div className="scanlines"></div>
               <div className="crt-overlay"></div>
               
               {gameState === GameState.INTRO && (
                 <div className="flex flex-col items-center justify-center h-full text-[#0f380f] relative z-10 bg-[#f0f8f0]">
                   <h1 className="text-xl sm:text-2xl text-center font-bold mb-8 px-2 leading-relaxed drop-shadow-md">
                     VALENTIN'S<br/>ADVENTURE
                   </h1>
                   <div className="mb-6 text-xs text-center">
                     ©2025 WATTELET<br/>
                     GAME FREAK INC.
                   </div>
                   
                   <div className="flex flex-col gap-3 w-full max-w-[220px] px-4">
                       <button 
                         onClick={() => {
                           if(navigator.vibrate) navigator.vibrate(20);
                           setGameState(GameState.OVERWORLD);
                         }}
                         className="text-[#0f380f] text-xs font-bold border-2 border-[#0f380f] py-3 px-2 hover:bg-[#0f380f] hover:text-[#f0f8f0] transition-colors flex items-center justify-center gap-2 pointer-events-auto"
                         style={{ pointerEvents: 'auto' }}
                       >
                         <span>▶</span> PLAY GAME
                       </button>
                       <button
                          onClick={() => window.location.href = '/cv.html'}
                          className="text-[#0f380f] text-xs font-bold border-2 border-[#0f380f] py-3 px-2 hover:bg-[#0f380f] hover:text-[#f0f8f0] transition-colors flex items-center justify-center gap-2 pointer-events-auto"
                          style={{ pointerEvents: 'auto' }}
                        >
                          <span>▶</span> VISIT WEBSITE
                        </button>
                   </div>
                 </div>
               )}

               {gameState === GameState.OVERWORLD && (
                 <Overworld 
                   onEncounter={handleEncounter}
                   onFinish={() => setGameState(GameState.FLYING)}
                   onOpenMenu={() => setGameState(GameState.MENU)}
                   visitedJobs={visitedJobs}
                   playerPos={playerPos}
                   setPlayerPos={setPlayerPos}
                 />
               )}

               {gameState === GameState.BATTLE && currentJob && (
                 <Battle 
                   job={currentJob} 
                   onClose={() => setGameState(GameState.OVERWORLD)} 
                 />
               )}

               {gameState === GameState.MENU && (
                 <Menu 
                   resume={RESUME} 
                   onClose={() => setGameState(GameState.OVERWORLD)}
                   onRestart={startOver}
                 />
               )}

               {gameState === GameState.IMAGE_EDITOR && (
                 <ImageEditor onClose={() => setGameState(GameState.MENU)} />
               )}
               
               {gameState === GameState.FLYING && (
                 <Takeoff onComplete={() => setGameState(GameState.ENDING)} />
               )}

               {gameState === GameState.ENDING && (
                 <div className="flex flex-col items-center justify-center h-full text-[#0f380f] p-4 text-center relative z-10 bg-[#f0f8f0]">
                   <h2 className="text-sm font-bold mb-4">HALL OF FAME</h2>
                   <p className="text-[10px] mb-4">Valentin Wattelet's career journey completed!</p>
                   
                   <div className="flex flex-col gap-2 w-full px-4 mt-4">
                       <a href={`mailto:${RESUME.contact.email}`} className="bg-[#0f380f] text-[#f0f8f0] p-3 text-[10px] block hover:bg-[#306230] pointer-events-auto">CONTACT ME</a>
                       <button onClick={() => window.location.href = '/cv.html'} className="bg-[#0f380f] text-[#f0f8f0] p-3 text-[10px] block hover:bg-[#306230] pointer-events-auto">WEBSITE</button>
                       <button onClick={startOver} className="text-[#0f380f] text-[10px] mt-4 hover:underline pointer-events-auto">RESTART GAME</button>
                   </div>
                 </div>
               )}
             </div>
              
             <div className="mt-1 hidden sm:block shrink-0">
                 <span className="text-[#b0b0b0] font-bold text-[8px] tracking-wider italic">Nintendo GAME BOY™</span>
             </div>
          </div>

          <div className="flex-none px-4 pb-8 sm:pb-4 flex flex-col justify-end shrink-0 pt-4">
             <div className="flex justify-between items-center mb-2">
                
                {/* ZONE CROIX DIRECTIONNELLE (JOYSTICK) */}
                <div 
                    ref={dpadRef}
                    className="w-24 h-24 sm:w-20 sm:h-20 relative flex-shrink-0 ml-2"
                    style={{ touchAction: 'none' }}
                    onPointerDown={handlePadMove}
                    onPointerMove={(e) => { if(e.buttons === 1) handlePadMove(e); }}
                    onPointerUp={stopMoving}
                    onPointerLeave={stopMoving}
                    onPointerCancel={stopMoving}
                >
                    <div className="w-full h-full bg-[#c5c5c5] rounded-full absolute opacity-20 inset-0 pointer-events-none"></div>
                    {/* Croix Visuelle */}
                    <div className="absolute top-0 left-8 sm:left-7 w-8 sm:w-6 h-full bg-[#303030] rounded-sm shadow-md pointer-events-none"></div>
                    <div className="absolute top-8 sm:top-7 left-0 w-full h-8 sm:h-6 bg-[#303030] rounded-sm shadow-md pointer-events-none"></div>
                    <div className="absolute top-8 sm:top-7 left-8 sm:left-7 w-8 sm:w-6 h-8 sm:h-6 bg-[#252525] rounded-full z-10 pointer-events-none opacity-50"></div>
                    
                    {/* Zones Visuelles Actives */}
                    <DPadVisual direction="UP" k="ArrowUp" style="top-0 left-8 sm:left-7 w-8 sm:w-6 h-8 sm:h-8" />
                    <DPadVisual direction="DOWN" k="ArrowDown" style="bottom-0 left-8 sm:left-7 w-8 sm:w-6 h-8 sm:h-8" />
                    <DPadVisual direction="LEFT" k="ArrowLeft" style="top-8 sm:top-7 left-0 w-8 sm:w-8 h-8 sm:h-6" />
                    <DPadVisual direction="RIGHT" k="ArrowRight" style="top-8 sm:top-7 right-0 w-8 sm:w-8 h-8 sm:h-6" />
                </div>

                <div className="flex gap-4 transform rotate-[-15deg] translate-y-2 pr-2">
                   <div className="mt-6">
                       <ActionBtn label="B" k="Escape" color="bg-[#8b1d3b]" />
                   </div>
                   <div className="">
                     <ActionBtn label="A" k=" " color="bg-[#8b1d3b]" />
                   </div>
                </div>
             </div>

             <div className="flex justify-center gap-8 transform rotate-[-15deg] mt-2 mb-2">
                <div className="flex flex-col items-center">
                   <button 
                      className="w-12 h-3 sm:w-10 sm:h-3 bg-[#303030] rounded-full border border-[#505050] active:translate-y-[1px] shadow-sm outline-none"
                      style={{ touchAction: 'none' }}
                      onPointerDown={(e) => { e.preventDefault(); if(navigator.vibrate) navigator.vibrate(10); simKey('Shift', 'keydown'); }} 
                      onPointerUp={(e) => { e.preventDefault(); simKey('Shift', 'keyup'); }}
                   />
                   <span className="text-[7px] sm:text-[6px] font-bold text-[#303080] mt-1 tracking-widest pointer-events-none">SELECT</span>
                </div>
                <div className="flex flex-col items-center">
                   <button 
                      className="w-12 h-3 sm:w-10 sm:h-3 bg-[#303030] rounded-full border border-[#505050] active:translate-y-[1px] shadow-sm outline-none"
                      style={{ touchAction: 'none' }}
                      onClick={() => {
                         if(navigator.vibrate) navigator.vibrate(10);
                         if (gameState === GameState.OVERWORLD) setGameState(GameState.MENU);
                         else if (gameState === GameState.MENU) setGameState(GameState.OVERWORLD);
                      }}
                   />
                   <span className="text-[7px] sm:text-[6px] font-bold text-[#303080] mt-1 tracking-widest pointer-events-none">START</span>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default App;
