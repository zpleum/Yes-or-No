'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [scaryLevel, setScaryLevel] = useState(0); // 0 (Pink) -> 3 (Deep Scary)
  const noButtonRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    setShowPopup(true);
    setScaryLevel(0);
  };

  const handleNoClick = () => {
    setNoButtonScale(noButtonScale / 2);
    setScaryLevel((prev) => Math.min(prev + 1, 3));
  };

  const handleNoHover = () => {
    // Generate random position within viewport bounds
    const maxX = window.innerWidth - 150; // button width
    const maxY = window.innerHeight - 60; // button height

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setIsMoving(true);
    setNoButtonPosition({ x: randomX, y: randomY });

    // Reset moving state after animation
    setTimeout(() => setIsMoving(false), 500);
  };

  // Theme interpolation based on scaryLevel
  const bgStyles = [
    'bg-[#fff5f7]',     // Level 0: Pink
    'bg-[#8b5c6e]',     // Level 1: Dark Pink/Mauve
    'bg-[#3a0a0a]',     // Level 2: Deep Dark Red
    'bg-black',         // Level 3: Pitch Black
  ];

  const textStyles = [
    'text-pink-600',                                     // Level 0
    'text-pink-200',                                     // Level 1
    'text-red-900',                                      // Level 2
    'text-red-700 drop-shadow-[0_0_20px_rgba(185,28,28,0.6)]', // Level 3
  ];

  const yesBtnStyles = [
    'bg-pink-500 text-white hover:shadow-pink-200 hover:shadow-xl hover:scale-105',     // Level 0
    'bg-pink-800 text-pink-100 hover:bg-pink-700',                                      // Level 1
    'bg-red-950 text-red-700 border border-red-900',                                    // Level 2
    'bg-red-800 text-black hover:bg-red-700 hover:shadow-red-900/40 hover:shadow-2xl',  // Level 3
  ];

  const noBtnStyles = [
    'border-pink-100 bg-white text-pink-500 hover:shadow-md',                           // Level 0
    'border-pink-300 bg-pink-100 text-pink-900',                                        // Level 1
    'border-red-900 bg-black text-red-900',                                             // Level 2
    'border-red-900 bg-zinc-900 text-red-900 grayscale hover:grayscale-0',              // Level 3
  ];

  return (
    <div className={`relative flex min-h-screen items-center justify-center transition-all duration-1000 overflow-hidden font-sans ${bgStyles[scaryLevel]}`}>
      {/* Main Content */}
      <div className="flex flex-col items-center gap-12 px-4 z-10 text-center">
        {/* Question */}
        <h1 className={`text-5xl md:text-7xl tracking-tighter transition-all duration-1000 font-light animate-float-slow ${textStyles[scaryLevel]} ${scaryLevel === 3 ? 'scale-110' : 'scale-100'}`}>
          Mu he he he?
        </h1>

        {/* Buttons Container */}
        <div className="flex gap-10 items-center">
          {/* YES Button */}
          <div
            onClick={handleYesClick}
            className={`px-12 py-4 text-lg font-medium rounded-full cursor-pointer shadow-sm transition-all duration-500 ease-out select-none active:scale-95 ${yesBtnStyles[scaryLevel]}`}
            style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            YES
          </div>

          {/* NO Button - Fixed position when not hovered */}
          <div
            ref={noButtonRef}
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            style={{
              transform: `scale(${noButtonScale})`,
              position: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'relative' : 'fixed',
              left: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.x}px`,
              top: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.y}px`,
              transition: isMoving ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.3s ease-out',
            }}
            className={`px-12 py-4 border text-lg font-medium rounded-full cursor-pointer shadow-sm select-none transition-all duration-500 ${noBtnStyles[scaryLevel]}`}
          >
            NO
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-pink-100/30 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white border border-pink-50 rounded-3xl p-10 md:p-16 shadow-2xl max-w-sm mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h2 className="text-3xl font-light tracking-tight text-pink-600 mb-8 animate-slide-up">
                He he he.
              </h2>
              <div
                onClick={() => setShowPopup(false)}
                className="px-10 py-3 bg-pink-500 text-white font-medium rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 inline-block shadow-sm hover:shadow-md"
                style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                CLOSE
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
