'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Rose = ({ style, className = "" }: { style: React.CSSProperties; className?: string }) => (
  <div className={`absolute w-12 h-12 pointer-events-none ${className}`} style={style}>
    <Image
      src="/rose.png"
      alt="Rose"
      width={48}
      height={48}
      className="object-contain"
    />
  </div>
);

const Sparkle = ({ style, color }: { style: React.CSSProperties; color: string }) => (
  <div
    className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${color}`}
    style={style}
  />
);

const Bouquet = ({ onRoseClick }: { onRoseClick?: () => void }) => (
  <div
    className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center animate-blossom cursor-pointer active:scale-95 transition-transform"
    onClick={onRoseClick}
  >
    <Image
      src="/rose.png"
      alt="Rose"
      width={180}
      height={180}
      className="object-contain"
      priority
    />
  </div>
);

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [scaryLevel, setScaryLevel] = useState(0); // 0 (Pink) -> 3 (Deep Scary)
  const [roses, setRoses] = useState<{ id: number; style: React.CSSProperties; scale: number }[]>([]);
  const [clickPopups, setClickPopups] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const noButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial sparkles
    const newSparkles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      },
    }));
    setSparkles(newSparkles);
  }, []);

  const handleYesClick = () => {
    setShowPopup(true);
    setScaryLevel(0);

    // Create a lot of floating roses (Grand Shower)
    const newRoses = Array.from({ length: 80 }).map((_, i) => ({
      id: Date.now() + i,
      scale: 0.5 + Math.random(),
      style: {
        left: `${Math.random() * 100}%`,
        bottom: '-100px',
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      },
    }));
    setRoses(newRoses);
  };

  const handleHeroRoseClick = () => {
    const newPopup = {
      id: Date.now(),
      style: {
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        transform: `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.5})`,
      },
    };
    setClickPopups((prev) => [...prev, newPopup]);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRoses([]);
    setClickPopups([]);
    setHasMoved(false);
    setNoButtonScale(1);
    setIsMoving(false);
  };

  const handleNoClick = () => {
    setNoButtonScale(noButtonScale / 2);
    setScaryLevel((prev) => Math.min(prev + 1, 3));

    // Also move to random position on click
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 60;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setIsMoving(true);
    setHasMoved(true);
    setNoButtonPosition({ x: randomX, y: randomY });
    setTimeout(() => setIsMoving(false), 500);
  };

  const handleNoHover = () => {
    // Generate random position within viewport bounds
    const maxX = window.innerWidth - 150; // button width
    const maxY = window.innerHeight - 60; // button height

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setIsMoving(true);
    setHasMoved(true);
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
    'bg-pink-500 text-white hover:shadow-pink-200 hover:shadow-xl hover:scale-110 animate-heartbeat',     // Level 0
    'bg-pink-800 text-pink-100 hover:bg-pink-700',                                      // Level 1
    'bg-red-950 text-red-700 border border-red-900',                                    // Level 2
    'bg-red-800 text-black hover:bg-red-700 hover:shadow-red-900/40 hover:shadow-2xl',  // Level 3
  ];

  const noBtnStyles = [
    'border-pink-100 bg-white text-pink-500 hover:shadow-md animate-slide-up-delayed',                           // Level 0
    'border-pink-300 bg-pink-100 text-pink-900',                                        // Level 1
    'border-red-900 bg-black text-red-900',                                             // Level 2
    'border-red-900 bg-zinc-900 text-red-900 grayscale hover:grayscale-0',              // Level 3
  ];

  return (
    <div className={`relative flex min-h-screen items-center justify-center transition-all duration-1000 overflow-hidden font-sans ${bgStyles[scaryLevel]}`}>
      {/* Background Sparkles */}
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          style={s.style}
          color={scaryLevel === 0 ? 'bg-pink-300' : 'bg-red-500/50'}
        />
      ))}

      {/* Floating Roses */}
      {roses.map((rose) => (
        <div
          key={rose.id}
          className="absolute"
          style={{ ...rose.style, transform: `scale(${rose.scale})` }}
        >
          <Rose className="animate-rose-pop" style={{ position: 'relative' }} />
        </div>
      ))}

      {/* Interactive Click Popups - Spawned by hero rose click */}
      {clickPopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed z-[60] animate-scale-in pointer-events-none"
          style={popup.style}
        >
          <Image
            src="/rose.png"
            alt="Spawned Rose"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl px-4">
        {/* Animated Question */}
        <h1
          className={`text-5xl md:text-7xl font-light tracking-tight mb-16 animate-float ${textStyles[scaryLevel]}`}
        >
          Do you love me?
        </h1>

        {/* Dynamic Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[100px]">
          {/* YES Button */}
          <div
            onClick={handleYesClick}
            className={`px-12 py-5 text-2xl font-medium rounded-full cursor-pointer transition-all duration-500 shadow-lg active:scale-95 ${yesBtnStyles[scaryLevel]}`}
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
              position: scaryLevel > 0 || hasMoved ? 'fixed' : 'relative',
              left: scaryLevel > 0 || hasMoved ? `${noButtonPosition.x}px` : 'auto',
              top: scaryLevel > 0 || hasMoved ? `${noButtonPosition.y}px` : 'auto',
              transform: `scale(${noButtonScale})`,
              transition: isMoving ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.3s ease',
            }}
            className={`px-12 py-5 text-2xl font-medium rounded-full cursor-pointer transition-all border shadow-sm active:scale-95 ${noBtnStyles[scaryLevel]} ${isMoving ? 'duration-500' : 'duration-0'}`}
          >
            NO
          </div>
        </div>
      </div>

      {/* Success Popup Card */}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[6px] animate-fade-in"
          onClick={closePopup}
        >
          <div
            className="glass-card rounded-[40px] p-12 md:p-20 max-w-md mx-4 animate-card-reveal overflow-hidden relative success-glow text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 animate-shimmer opacity-30 z-0" />
            <div className="relative z-10 flex flex-col items-center">
              <Bouquet onRoseClick={handleHeroRoseClick} />
              <h2 className="text-4xl font-light tracking-tight text-pink-600 mb-10 animate-slide-up">
                I love you too!
              </h2>
              <div
                onClick={closePopup}
                className="px-14 py-4 bg-pink-500 text-white text-lg font-medium rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-pink-200/50"
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
