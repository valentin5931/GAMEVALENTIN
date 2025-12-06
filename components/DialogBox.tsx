import React, { useState, useEffect } from 'react';

interface DialogBoxProps {
  text: string;
  onComplete?: () => void;
  speed?: number;
}

const DialogBox: React.FC<DialogBoxProps> = ({ text, onComplete, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-32 bg-[#fff] border-t-4 border-[#0f380f] p-1 font-bold text-[#0f380f] uppercase leading-relaxed z-50 font-['Press_Start_2P']">
      <div className="border-4 border-[#0f380f] h-full p-2 relative bg-[#fff] rounded-sm">
        <p className="text-xs leading-5">{displayedText}</p>
        {currentIndex >= text.length && (
            <div className="absolute bottom-2 right-2 animate-bounce">▼</div>
        )}
      </div>
    </div>
  );
};

export default DialogBox;