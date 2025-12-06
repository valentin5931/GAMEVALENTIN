import React, { useState } from 'react';
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

  const startOver = () => {
    setGameState(GameState.OVERWORLD);
    setVisitedJobs(new Set());
    setCurrentJob(null);
    setPlayerPos(INITIAL_POS);
  };

  const handleEncounter = (job: Job) => {
    setCurrentJob(job);
    setGameState(GameState.BATTLE);
    setVisitedJobs(prev => new Set(prev).add(job.id));
  };

  const simKey = (key: string, type: 'keydown' | 'keyup') => {
      window.dispatchEvent(new KeyboardEvent(type, { key }));
  };

  const DPadBtn = ({ direction, k, style }: { direction: string, k: string, style: string }) => (
      <button
          className={`absolute ${style} hover:bg-[#252525] active:bg-[#1a1a1a] touch-none`}
          onPointerDown={(e) => { e.preventDefault(); simKey(k, 'keydown'); }}
          onPointerUp={(e) => { e.preventDefault(); simKey(k, 'keyup'); }}
          onPointerLeave={(e) => { e.preventDefault(); simKey(k, 'keyup'); }}
          onContextMenu={(e) => e.preventDefault()}
          aria-label={direction}
      />
  );

  const ActionBtn = ({ label, k, color }: { label: string, k: string, color: string }) => (
      <div className="flex flex-col items-center gap-1 transform active:translate-y-[2px]">
          <button
              className={`w-10 h-10 rounded-full shadow-lg border-b-4 touch-none ${color} border-opacity-40 active:border-b-0`}
              style={{ borderColor: 'rgba(0,0,0,0.3)' }}
              onPointerDown={(e) => { e.preventDefault(); simKey(k, 'keydown'); }}
              onPointerUp={(e) => { e.preventDefault(); simKey(k, 'keyup'); }}
              onPointerLeave={(e) => { e.preventDefault(); simKey(k, 'keyup'); }}
              onContextMenu={(e) => e.preventDefault()}
          />
          <span className="font-bold text-[#303080] text-[10px] select-none">{label}</span>
      </div>
  );

  return (
    <div className="w-full h-[100dvh] bg-[#202020] flex items-center justify-center overflow-hidden font-sans">
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
                        onClick={() => setGameState(GameState.OVERWORLD)}
                        className="text-[#0f380f] text-xs font-bold border-2 border-[#0f380f] py-3 px-2 hover:bg-[#0f380f] hover:text-[#f0f8f0] transition-colors flex items-center justify-center gap-2"
                      >
                        <span>▶</span> PLAY GAME
                      </button>
                      <button 
                        onClick={() => { window.open = '/cv.html' },
                        className="text-[#0f380f] text-xs font-bold border-2 border-[#0f380f] py-3 px-2 hover:bg-[#0f380f] hover:text-[#f0f8f0] transition-colors flex items-center justify-center gap-2"
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
                     <a href={`mailto:${RESUME.contact.email}`} className="bg-[#0f380f] text-[#f0f8f0] p-3 text-[10px] block hover:bg-[#306230]">CONTACT ME</a>
                     <button onClick={() => window.open = '/cv.html' }, className="bg-[#0f380f] text-[#f0f8f0] p-3 text-[10px] block hover:bg-[#306230]">WEBSITE</button>
                     <button onClick={startOver} className="text-[#0f380f] text-[10px] mt-4 hover:underline">RESTART GAME</button>
                  </div>
                </div>
              )}
            </div>
             
             <div className="mt-1 hidden sm:block shrink-0">
                 <span className="text-[#b0b0b0] font-bold text-[8px] tracking-wider italic">Nintendo GAME BOY™</span>
             </div>
         </div>

         <div className="flex-none px-4 py-2 flex flex-col justify-end shrink-0">
            <div className="flex justify-between items-center mb-1">
               <div className="w-20 h-20 relative flex-shrink-0">
                   <div className="w-full h-full bg-[#c5c5c5] rounded-full absolute opacity-20 inset-0 pointer-events-none"></div>
                   <div className="absolute top-0 left-7 w-6 h-full bg-[#303030] rounded-sm shadow-md"></div>
                   <div className="absolute top-7 left-0 w-full h-6 bg-[#303030] rounded-sm shadow-md"></div>
                   <div className="absolute top-7 left-7 w-6 h-6 bg-[#252525] rounded-full z-10 pointer-events-none opacity-50"></div>
                   <DPadBtn direction="UP" k="ArrowUp" style="top-0 left-7 w-6 h-8" />
                   <DPadBtn direction="DOWN" k="ArrowDown" style="bottom-0 left-7 w-6 h-8" />
                   <DPadBtn direction="LEFT" k="ArrowLeft" style="top-7 left-0 w-8 h-6" />
                   <DPadBtn direction="RIGHT" k="ArrowRight" style="top-7 right-0 w-8 h-6" />
               </div>

               <div className="flex gap-3 transform rotate-[-15deg] translate-y-1 pr-2">
                  <div className="mt-3">
                     <ActionBtn label="B" k="Escape" color="bg-[#8b1d3b]" />
                  </div>
                  <div className="">
                    <ActionBtn label="A" k=" " color="bg-[#8b1d3b]" />
                  </div>
               </div>
            </div>

            <div className="flex justify-center gap-3 transform rotate-[-15deg] pb-2">
               <div className="flex flex-col items-center">
                  <button 
                     className="w-8 h-2 bg-[#303030] rounded-full border border-[#505050] active:translate-y-[1px] shadow-sm touch-none"
                     onPointerDown={(e) => { e.preventDefault(); simKey('Shift', 'keydown'); }} 
                     onPointerUp={(e) => { e.preventDefault(); simKey('Shift', 'keyup'); }}
                  />
                  <span className="text-[5px] font-bold text-[#303080] mt-0.5 tracking-widest">SELECT</span>
               </div>
               <div className="flex flex-col items-center">
                  <button 
                     className="w-8 h-2 bg-[#303030] rounded-full border border-[#505050] active:translate-y-[1px] shadow-sm touch-none"
                     onClick={() => {
                        if (gameState === GameState.OVERWORLD) setGameState(GameState.MENU);
                        else if (gameState === GameState.MENU) setGameState(GameState.OVERWORLD);
                     }}
                  />
                  <span className="text-[5px] font-bold text-[#303080] mt-0.5 tracking-widest">START</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default App;
