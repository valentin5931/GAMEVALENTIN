import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Job } from '../types';
import { RESUME } from '../data/resumeData';
import { 
  GAME_MAP, 
  jobPositions, 
  MAP_WIDTH, 
  MAP_HEIGHT, 
  PLANE_POS, 
  GRASS, 
  WATER, 
  TREE, 
  SAND, 
  RUNWAY, 
  RUNWAY_MARKING 
} from '../utils/mapUtils';

const TILES = {
  [GRASS]: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%232d5a27'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%231e3c1a' opacity='0.5'/%3E%3Crect x='10' y='12' width='2' height='2' fill='%231e3c1a' opacity='0.5'/%3E%3Crect x='6' y='8' width='2' height='2' fill='%231e3c1a' opacity='0.5'/%3E%3C/svg%3E",
  [WATER]: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%233498db'/%3E%3Cpath d='M2 4h4v1H2zM9 4h4v1H9z' fill='%23ffffff' opacity='0.6'/%3E%3Cpath d='M4 10h4v1H4zM11 10h4v1H11z' fill='%23ffffff' opacity='0.6'/%3E%3C/svg%3E",
  [TREE]: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23f6d7b0'/%3E%3Cpath d='M7 10h2v6H7z' fill='%238B4513'/%3E%3Cpath d='M2 6c0-2 4-2 6 0 2-2 6-2 6 0 0 2-2 4-6 2-4 2-6 0-6-2z' fill='%23228B22'/%3E%3Ccircle cx='5' cy='7' r='2' fill='%23006400' opacity='0.3'/%3E%3Ccircle cx='11' cy='7' r='2' fill='%23006400' opacity='0.3'/%3E%3C/svg%3E",
  [SAND]: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23f6d7b0'/%3E%3Crect x='2' y='3' width='1' height='1' fill='%23d4b483'/%3E%3Crect x='12' y='2' width='1' height='1' fill='%23d4b483'/%3E%3Crect x='6' y='10' width='1' height='1' fill='%23d4b483'/%3E%3Crect x='10' y='14' width='1' height='1' fill='%23d4b483'/%3E%3C/svg%3E",
  [RUNWAY]: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%237f8c8d'/%3E%3Crect width='16' height='16' fill='%23000' opacity='0.1'/%3E%3C/svg%3E",
  [RUNWAY_MARKING]: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%237f8c8d'/%3E%3Crect x='6' y='0' width='4' height='16' fill='%23ecf0f1'/%3E%3C/svg%3E"
};

const PLAYER_SPRITE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect x='5' y='2' width='6' height='5' fill='%23ffcc99'/%3E%3Cpath d='M4 7h8v5H4z' fill='%233498db'/%3E%3Cpath d='M4 12h3v4H4zM9 12h3v4H9z' fill='%232c3e50'/%3E%3Crect x='3' y='8' width='1' height='2' fill='%23ffcc99'/%3E%3Crect x='12' y='8' width='1' height='2' fill='%23ffcc99'/%3E%3C/svg%3E";
const JOB_BALL_SPRITE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='6' fill='%23e74c3c' stroke='%232c3e50' stroke-width='1'/%3E%3Cpath d='M2 8h12' stroke='%232c3e50' stroke-width='1'/%3E%3Ccircle cx='8' cy='8' r='2' fill='%23ffffff' stroke='%232c3e50' stroke-width='1'/%3E%3Cpath d='M2 8 a6 6 0 0 0 12 0' fill='%23ffffff'/%3E%3C/svg%3E";
const BIG_PLANE_SPRITE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath d='M30 4 L34 4 L34 20 L58 24 L58 30 L34 28 L34 44 L44 50 L44 54 L32 52 L20 54 L20 50 L30 44 L30 28 L6 30 L6 24 L30 20 Z' fill='%23ecf0f1' stroke='%232c3e50' stroke-width='2'/%3E%3C/svg%3E";

interface OverworldProps {
  onEncounter: (job: Job) => void;
  onFinish: () => void;
  onOpenMenu: () => void;
  visitedJobs: Set<string>;
  playerPos: Position;
  setPlayerPos: React.Dispatch<React.SetStateAction<Position>>;
}

const Overworld: React.FC<OverworldProps> = ({ onEncounter, onFinish, onOpenMenu, visitedJobs, playerPos, setPlayerPos }) => {
  const [facing, setFacing] = useState<'down' | 'up' | 'left' | 'right'>('up');
  const [isWalking, setIsWalking] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const warningTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastMoveTime = useRef<number>(0);
  const MOVE_INTERVAL = 90;

  const showWarning = (text: string) => {
    if (warningTimeout.current) clearTimeout(warningTimeout.current);
    setWarning(text);
    warningTimeout.current = setTimeout(() => setWarning(null), 2000);
  };

  const attemptMove = useCallback((dx: number, dy: number, dir: 'down' | 'up' | 'left' | 'right') => {
    setFacing(dir);
    setIsWalking(prev => !prev);
    
    setPlayerPos((current) => {
        const newX = current.x + dx;
        const newY = current.y + dy;

        if (newX < 0 || newX >= MAP_WIDTH || newY < 0 || newY >= MAP_HEIGHT) return current;

        const tile = GAME_MAP[newY][newX];
        if (tile === TREE) return current; 
        if (tile === WATER) return current;

        if ((tile === RUNWAY || tile === RUNWAY_MARKING)) {
           if (visitedJobs.size < RESUME.jobs.length) {
              showWarning("NEED MORE XP!");
              return current;
           }
        }

        if ((tile === RUNWAY || tile === RUNWAY_MARKING) && newY <= 5) {
            setTimeout(onFinish, 0);
            return { x: newX, y: newY };
        }
        
        const jobAtPos = jobPositions.find(j => Math.abs(j.x - newX) < 2 && Math.abs(j.y - newY) < 2);
        if (jobAtPos && !visitedJobs.has(jobAtPos.id)) {
            const jobData = RESUME.jobs.find(j => j.id === jobAtPos.id);
            if (jobData) {
                setTimeout(() => {
                    onEncounter(jobData);
                }, 50);
            }
        }

        return { x: newX, y: newY };
    });
  }, [visitedJobs, onEncounter, onFinish, setPlayerPos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
         e.preventDefault();
      }
      keysPressed.current[e.key] = true;

      if (e.key === 'Enter') onOpenMenu();
      if (e.key === 'Escape') onOpenMenu();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onOpenMenu]);

  useEffect(() => {
    let animationFrameId: number;

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastMoveTime.current > MOVE_INTERVAL) {
        let dx = 0;
        let dy = 0;
        let direction: 'up' | 'down' | 'left' | 'right' | null = null;

        if (keysPressed.current['ArrowUp'] || keysPressed.current['w']) {
           dy = -1; direction = 'up';
        }
        else if (keysPressed.current['ArrowDown'] || keysPressed.current['s']) {
           dy = 1; direction = 'down';
        }
        else if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
           dx = -1; direction = 'left';
        }
        else if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
           dx = 1; direction = 'right';
        }

        if (direction) {
          attemptMove(dx, dy, direction);
          lastMoveTime.current = timestamp;
        } else {
           if (Math.random() > 0.9) setIsWalking(false);
        }
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [attemptMove]);

  const VIEWPORT_SIZE = 13;
  const halfView = Math.floor(VIEWPORT_SIZE / 2);
  const startX = Math.max(0, Math.min(playerPos.x - halfView, MAP_WIDTH - VIEWPORT_SIZE));
  const startY = Math.max(0, Math.min(playerPos.y - halfView, MAP_HEIGHT - VIEWPORT_SIZE));

  const renderTile = (tileType: number, x: number, y: number) => {
    let backgroundImage = `url("${TILES[GRASS]}")`;
    if (tileType === WATER) backgroundImage = `url("${TILES[WATER]}")`;
    if (tileType === TREE) backgroundImage = `url("${TILES[TREE]}")`;
    if (tileType === SAND) backgroundImage = `url("${TILES[SAND]}")`;
    if (tileType === RUNWAY) backgroundImage = `url("${TILES[RUNWAY]}")`;
    if (tileType === RUNWAY_MARKING) backgroundImage = `url("${TILES[RUNWAY_MARKING]}")`;

    const job = jobPositions.find(j => j.x === x && j.y === y);
    let content = null;
    
    if (job) {
       if (!visitedJobs.has(job.id)) {
          content = <img src={JOB_BALL_SPRITE} className="w-full h-full animate-bounce" alt="Item" />;
       } else {
          content = <div className="w-full h-full opacity-50 scale-75 grayscale"><img src={JOB_BALL_SPRITE} alt="Used" /></div>;
       }
    }

    if (x === playerPos.x && y === playerPos.y) {
       content = (
         <div className="w-full h-full relative flex items-center justify-center z-10">
            <img 
                src={PLAYER_SPRITE} 
                alt="Player" 
                className={`w-full h-full transition-transform ${facing === 'left' ? 'scale-x-[-1]' : ''} ${isWalking ? 'translate-y-[1px]' : ''}`} 
            />
         </div>
       );
    }

    return (
      <div 
        key={`${x}-${y}`} 
        className="w-8 h-8 flex items-center justify-center pixel-art relative"
        style={{ backgroundImage, backgroundSize: 'cover' }}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#3498db] overflow-hidden">
      <div className="bg-[#f0f8f0] p-1 rounded shadow-xl border-b-4 border-r-4 border-[#306230] relative">
        <div 
            className="grid gap-0 border-4 border-[#2c3e50] bg-[#3498db] relative overflow-hidden"
            style={{ 
                gridTemplateColumns: `repeat(${VIEWPORT_SIZE}, minmax(0, 1fr))` 
            }}
        >
           {(() => {
              const relX = PLANE_POS.x - startX;
              const relY = PLANE_POS.y - startY;
              if (relX > -4 && relX < VIEWPORT_SIZE && relY > -4 && relY < VIEWPORT_SIZE) {
                 return (
                   <img 
                     src={BIG_PLANE_SPRITE} 
                     className="absolute w-32 h-32 pointer-events-none z-20 pixel-art"
                     style={{ 
                       left: `${relX * 32}px`, 
                       top: `${relY * 32}px` 
                      }}
                     alt="Plane"
                   />
                 );
              }
              return null;
           })()}

           {Array.from({ length: VIEWPORT_SIZE }).map((_, dy) => (
             Array.from({ length: VIEWPORT_SIZE }).map((_, dx) => {
               const mapY = startY + dy;
               const mapX = startX + dx;
               if (mapY < MAP_HEIGHT && mapX < MAP_WIDTH) {
                 return renderTile(GAME_MAP[mapY][mapX], mapX, mapY);
               }
               return <div key={`${dx}-${dy}`} className="w-8 h-8 bg-[#3498db]" />;
             })
           ))}

           {warning && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
               <div className="bg-[#fff] border-2 border-[#202020] px-3 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                  <p className="text-[10px] text-[#e74c3c] font-bold text-center animate-pulse text-nowrap">
                      {warning}
                  </p>
               </div>
               <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#202020] mx-auto mt-[-2px]"></div>
            </div>
           )}

        </div>
        <div className="mt-1 flex justify-between items-center text-[#2c3e50] text-[10px] font-bold px-1">
           <div className="bg-[#f6d7b0] border-2 border-[#2c3e50] px-2 rounded text-[#8B4513]">ISLAND ROUTE 1</div>
           <button className="text-[#2c3e50] hover:text-[#e74c3c] blink" onClick={onOpenMenu}>START</button>
        </div>
      </div>
    </div>
  );
};

export default Overworld;