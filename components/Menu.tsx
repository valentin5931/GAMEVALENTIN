import React from 'react';
import { ResumeData } from '../types';

interface MenuProps {
  resume: ResumeData;
  onClose: () => void;
  onRestart: () => void;
}

const TrainerAvatar = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" className="pixel-art">
    <rect width="16" height="16" fill="#9bbc0f" />
    <path d="M3 11 h10 v5 h-10 z" fill="#3498db" />
    <path d="M3 11 L5 9 L11 9 L13 11" fill="#3498db" />
    <rect x="5" y="2" width="6" height="8" fill="#ffcc99" />
    <rect x="4" y="4" width="1" height="3" fill="#ffcc99" />
    <rect x="11" y="4" width="1" height="3" fill="#ffcc99" />
    <rect x="5" y="6" width="1" height="3" fill="#5c4033" />
    <rect x="10" y="6" width="1" height="3" fill="#5c4033" />
    <rect x="6" y="7" width="4" height="3" fill="#5c4033" />
    <rect x="5" y="9" width="6" height="1" fill="#5c4033" />
    <rect x="6" y="4" width="1" height="1" fill="#202020" />
    <rect x="9" y="4" width="1" height="1" fill="#202020" />
    <rect x="6" y="3" width="1" height="1" fill="#5c4033" opacity="0.8" />
    <rect x="9" y="3" width="1" height="1" fill="#5c4033" opacity="0.8" />
  </svg>
);

const Menu: React.FC<MenuProps> = ({ resume, onClose, onRestart }) => {
  const [tab, setTab] = React.useState<'main' | 'skills' | 'contact'>('main');

  const menuItems: { label: string; action: () => void; subtitle?: string }[] = [
    { label: 'SKILLS', action: () => setTab('skills') },
    { label: 'TRAINER CARD', action: () => setTab('contact') },
    { label: 'VISIT WEBSITE', action: () => window.open('https://valentinwattelet.com', '_blank', 'noopener,noreferrer') },
    { label: 'RESUME', action: onClose },
    { label: 'RESTART', action: onRestart }
  ];

  return (
    <div className="absolute right-0 top-0 h-full w-2/3 bg-[#fff] border-l-4 border-[#0f380f] z-40 flex flex-col shadow-2xl font-['Press_Start_2P']">
      
      <div className="flex-1 bg-[#fff] p-2 flex flex-col gap-2 overflow-y-auto">
        {tab === 'main' && (
          <div className="flex flex-col gap-1 mt-4">
            {menuItems.map((item, idx) => (
              <div 
                key={idx} 
                className="group cursor-pointer p-2 hover:bg-[#9bbc0f] flex items-center"
                onClick={item.action}
              >
                <span className="opacity-0 group-hover:opacity-100 mr-2 text-[#0f380f]">▶</span>
                <div>
                    <h3 className="text-[#0f380f] text-xs font-bold">{item.label}</h3>
                    {item.subtitle && <p className="text-[8px] text-[#306230]">{item.subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'skills' && (
          <div className="flex flex-col gap-2 h-full p-2">
             <button onClick={() => setTab('main')} className="text-left text-xs mb-4 text-[#0f380f] hover:bg-[#9bbc0f] p-1 w-full block">◀ BACK</button>
            <h3 className="font-bold mb-2 text-xs border-b-2 border-[#0f380f] pb-1">MOVES LIST</h3>
            {resume.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="mb-2">
                <p className="text-[10px] font-bold text-[#306230] mb-1">{skillGroup.category.toUpperCase()}</p>
                <ul className="text-[10px] list-none ml-2">
                  {skillGroup.items.map(s => <li key={s} className="mb-1">- {s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'contact' && (
          <div className="flex flex-col gap-2 h-full p-2">
             <button onClick={() => setTab('main')} className="text-left text-xs mb-4 text-[#0f380f] hover:bg-[#9bbc0f] p-1 w-full block">◀ BACK</button>
            <div className="border-4 border-[#0f380f] p-2 bg-[#9bbc0f] relative shadow-lg">
               <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="font-bold text-xs mb-1">NAME</p>
                    <p className="text-xs mb-2">{resume.name}</p>
                 </div>
                 <div className="w-12 h-12 bg-[#fff] border-2 border-[#0f380f] flex items-center justify-center overflow-hidden">
                    <TrainerAvatar />
                 </div>
               </div>
               
               <p className="font-bold text-xs mb-1">ROLE</p>
               <p className="text-[10px] mb-4">{resume.role}</p>
               
               <p className="font-bold text-xs mb-1">CONTACT</p>
               <p className="text-[8px] mb-1 truncate">{resume.contact.email}</p>
               <p className="text-[8px] mb-1">{resume.contact.phone}</p>
               <p className="text-[8px] mb-1">{resume.contact.linkedin}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-[#0f380f] p-1">
        <p className="text-white text-[8px] text-center">SELECT TO NAVIGATE</p>
      </div>
    </div>
  );
};

export default Menu;