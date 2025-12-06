import React, { useEffect, useState } from 'react';

const BIG_PLANE_SPRITE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpath d='M30 4 L34 4 L34 20 L58 24 L58 30 L34 28 L34 44 L44 50 L44 54 L32 52 L20 54 L20 50 L30 44 L30 28 L6 30 L6 24 L30 20 Z' fill='%23ecf0f1' stroke='%232c3e50' stroke-width='2'/%3E%3C/svg%3E";

interface TakeoffProps {
  onComplete: () => void;
}

const Takeoff: React.FC<TakeoffProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 4000);
    const timer3 = setTimeout(() => setStage(3), 7000);
    const timer4 = setTimeout(onComplete, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-[#3498db] z-50 flex flex-col items-center overflow-hidden font-['Press_Start_2P']">
      
      <style>{`
        @keyframes cloudScroll {
          from { transform: translateY(-10%); opacity: 0.2; }
          to { transform: translateY(100%); opacity: 0.8; }
        }
        .cloud-bg {
          animation: cloudScroll 0.5s linear infinite;
        }
      `}</style>
      
      <div className={`absolute inset-0 pointer-events-none flex justify-center ${stage >= 2 ? 'cloud-bg' : 'opacity-0'}`}>
         <div className="w-full h-full bg-gradient-to-b from-[#3498db] via-white to-[#3498db] opacity-20"></div>
      </div>

      <div className={`absolute top-10 left-10 text-white text-4xl opacity-40 transition-transform duration-[4s] ${stage >= 2 ? 'translate-y-[800px]' : ''}`}>☁</div>
      <div className={`absolute top-40 right-10 text-white text-6xl opacity-40 transition-transform duration-[4s] ${stage >= 2 ? 'translate-y-[800px]' : ''}`}>☁</div>
      <div className={`absolute bottom-20 left-20 text-white text-5xl opacity-40 transition-transform duration-[4s] ${stage >= 2 ? 'translate-y-[800px]' : ''}`}>☁</div>

      <div className="z-20 mt-24 w-3/4">
        {stage === 1 && (
            <div className="bg-white border-4 border-[#2c3e50] p-4 rounded shadow-[4px_4px_0_rgba(0,0,0,0.2)] animate-bounce">
                <p className="text-[#2c3e50] text-xs text-center leading-6">
                    "Valentin is cleared for immediate departure!"
                </p>
            </div>
        )}
        {stage >= 2 && (
            <div className="bg-white border-4 border-[#2c3e50] p-4 rounded shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                <p className="text-[#2c3e50] text-xs text-center leading-6">
                    Next Destination:<br/>
                    <span className="text-[#e74c3c] font-bold text-sm block mt-2">WORKING WITH YOU!</span>
                </p>
            </div>
        )}
      </div>

      <div className={`absolute bottom-20 transition-all duration-[3000ms] ease-in-out ${stage >= 2 ? 'translate-y-[-800px] scale-[2]' : ''}`}>
          <img src={BIG_PLANE_SPRITE} className="w-40 h-40 pixel-art" alt="Plane" />
          {stage >= 2 && (
             <div className="absolute left-1/2 -translate-x-1/2 top-[80%] flex gap-4">
                <div className="w-2 h-16 bg-yellow-400 animate-pulse blur-[2px]"></div>
                <div className="w-2 h-16 bg-yellow-400 animate-pulse blur-[2px]"></div>
             </div>
          )}
      </div>

    </div>
  );
};

export default Takeoff;