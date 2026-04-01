/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Utensils, Dog, Sparkles, Camera, ChevronRight, Timer, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

type PageId = '1' | '2' | '3' | '3a' | '4' | '5' | '6' | '7' | '8';

interface PageContent {
  id: PageId;
  title: string;
  matchTime: string;
  text: string[];
  images: string[];
  buttonText: string;
  secondaryButtonText?: string;
  ballPosition: number; // 0 to 100
}

const PAGES: PageContent[] = [
  {
    id: '1',
    title: 'Kick Off',
    matchTime: "0'",
    text: [
      'Heyyy boba 🤍',
      'I made you a little birthday website. Nothing crazy, just my way of passing you something from the heart, even if we are not on the same team right now.',
      'Take your time going through it, no rush. There are a few moments in there I really want you to see. I hope it hits like a perfect goal and makes you smile 🤍⚽️',
      'tiny: (Psst... click the hearts for a surprise! 🤫✨)'
    ],
    images: ['https://i.postimg.cc/j2XMTSzf/IMG-5534.png'],
    buttonText: 'Kick Off',
    ballPosition: 0
  },
  {
    id: '2',
    title: 'The Opening Whistle',
    matchTime: "15'",
    text: [
      'I still remember the opening whistle,',
      'even from far away, something real started between us.',
      'A message here, a laugh there, small moments that didn’t seem like much at the time, but they led us to this match.',
      'Somehow, those little moments became the start of a season I never expected, but now I can’t imagine my life without you on my team.'
    ],
    images: [
      'https://i.postimg.cc/dQrMX2gM/PHOTO-2025-11-08-22-23-25.jpg',
      'https://i.postimg.cc/SRzPphgG/IMG-0586.jpg'
    ],
    buttonText: 'Next Play',
    ballPosition: 15
  },
  {
    id: '3',
    title: 'Match Highlights',
    matchTime: "30'",
    text: [
      'We’ve played a lot of matches together,through calls, messages, and video chats. Every moment, whether chaotic or smooth, feels like part of our highlight reel, reminding me that we’re a stronger team when we play side by side.',
      'I still think about that one moment when I made that video,yeah, the one where I was basically trying to “force” you to love me. Not exactly my best play… a little reckless, a little weird. But somehow, that’s part of my game, and you’ve always embraced it. And instead of walking off the pitch, you came back with the sweetest response,like the perfect assist I didn’t even see coming.',
      'No matter how many seasons pass, you’ll always have a place in my squad,right in my heart, forever and always.'
    ],
    images: [
      'https://i.postimg.cc/xTZKzmTP/IMG-6791.png',
      'https://i.postimg.cc/ht9ftQJR/IMG-6779.jpg',
      'https://i.postimg.cc/8PL6j032/IMG-6789.jpg',
      'https://i.postimg.cc/FKYFJfzS/IMG-6778.jpg'
    ],
    buttonText: 'Next Play',
    ballPosition: 30
  },
  {
    id: '3a',
    title: 'Tough Fixtures',
    matchTime: "45'",
    text: [
      'Not every fixture has been easy,',
      'distance isn’t always kind, and there have been days that tested our defense.',
      'But even through the tough matches, we never stopped moving forward, never stopped choosing each other.',
      'The ball keeps moving, just like us, and we always find a way to score.'
    ],
    images: [],
    buttonText: 'Second Half',
    ballPosition: 45
  },
  {
    id: '4',
    title: 'Team Tactics',
    matchTime: "60'",
    text: [
      'There are so many little things I love about you,',
      'the way you make me laugh even on tough match days,',
      'the way you care without even trying,',
      'how just thinking about you can turn any bad game into a victory.',
      'You’re more than I ever imagined, and I’m so lucky to have you as my star player, even from far away.'
    ],
    images: [],
    buttonText: 'Next Play',
    ballPosition: 60
  },
  {
    id: '5',
    title: 'Scouting Report',
    matchTime: "75'",
    text: ['Here is your scouting report, how I see you on and off the pitch.'],
    images: [
      'https://i.postimg.cc/1zFhQD44/IMG-0577.jpg',
      'https://i.postimg.cc/tC4KgKYY/IMG-0580.jpg',
      'https://i.postimg.cc/brNBsnY1/IMG-0581.jpg',
      'https://i.postimg.cc/63zHJQVc/IMG-0582.jpg',
      'https://i.postimg.cc/RhyL4JWZ/IMG-0583.jpg',
      'https://i.postimg.cc/BbrHdWz7/IMG-0584.jpg'
    ],
    buttonText: 'Next Play',
    ballPosition: 75
  },
  {
    id: '6',
    title: 'The Starting Lineup',
    matchTime: "85'",
    text: [
      'And honestly, I do not say it enough, but you make my life feel lighter, like playing with no pressure, just pure freedom on the pitch. Even on the days when I am off my game or completely out of form, you still choose me, and that means everything. You stay, you support me, and you never make me feel like I am not good enough.',
      'I love how we can switch from serious moments to laughing like we just scored the craziest goal. I love how you have become my safe ground, my home stadium. Being with you feels right, like playing exactly where I am meant to be. You are not just someone I love, you are my teammate for the long run.',
      'I know I am not perfect, I will miss chances and make mistakes, but I will always keep trying for you. I will always choose you, even in the toughest matches. Because what we have is real, and it is worth fighting for until the final whistle.',
      'And I hope you are there for all my big moments, like I want to be there for yours, celebrating every win together. Because you are not just a moment in my life, you are part of my future, my journey, my season ahead.',
      'So yeah, it is your special day, but somehow you are still the one giving me the greatest win I could ever ask for, your love 🤍'
    ],
    images: ['https://i.postimg.cc/tT1k1GLT/IMG-0585.jpg'],
    buttonText: 'Final Whistle',
    ballPosition: 85
  },
  {
    id: '7',
    title: 'The Final Play',
    matchTime: "90'",
    text: [
      'If you’re reading this, it means you’ve made it to the final whistle,and I guess that makes you officially part of my club now.',
      'But before the match ends, there’s something I’ve been wanting to say. I never expected you to become one of the best players in my life. I thought you’d just be another one passing through,someone who’d play a few minutes and disappear. But you turned out to be so much more than that.',
      'You didn’t just sit on the sidelines supporting me,you stepped onto the pitch and became part of my game, part of my rhythm… a part of me I never want to lose.',
      'And hey, I know I’m not always the best at expressing my emotions. Sometimes I fumble my words or miss the moment completely. But I need you to know this,I love you so much. More than I can properly put into words, more than I even know how to explain… it’s just real, and it’s yours.',
      'So here’s what I need to know before we walk off this field,will you keep choosing me, the same way I’ll always choose you… so we can stay teammates, season after season?'
    ],
    images: [],
    buttonText: 'Yes 💙',
    secondaryButtonText: 'Obviously yes 😭',
    ballPosition: 95
  },
  {
    id: '8',
    title: 'Victory 🤭',
    matchTime: "FT",
    text: [
      'I knew it, you were never going to say no! 🤭',
      'Honestly, I didn’t even give you the option, but it worked out perfectly anyway. ⚽️',
      'I’m so happy we won this match together. 🤍',
      'You really mean a lot to me, more than I can put into words. 💙✨'
    ],
    images: [],
    buttonText: 'Full Time',
    ballPosition: 100
  }
];

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            opacity: [0, 0.4, 0.4, 0],
            y: "-10vh",
            rotate: Math.random() * 360 + 180
          }}
          transition={{ 
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-white/10"
        >
          <Heart size={Math.random() * 30 + 20} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}

function LoveHotSpots() {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const spots = useRef([...Array(12)].map(() => ({
    top: `${Math.random() * 90 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
    message: [
      "Goal of the Season! 🤍",
      "Perfect Assist! ⚽️",
      "Unstoppable Duo! 🏆",
      "Match Winner! ✨",
      "Golden Boot Love! 👟",
      "Clean Sheet Heart! 🛡️",
      "Hat-trick of Hugs! 🤗",
      "Extra Time Love! ⏱️",
      "Top Corner Kiss! 💋",
      "Captain's Choice! 🎖️",
      "Pitch Perfect! 🌟",
      "Final Whistle Win! 🏁"
    ][Math.floor(Math.random() * 12)]
  })));

  const triggerSpot = (i: number) => {
    setActiveSpot(i);
    confetti({
      particleCount: 15,
      spread: 70,
      origin: { 
        x: parseFloat(spots.current[i].left) / 100, 
        y: parseFloat(spots.current[i].top) / 100 
      },
      colors: ['#22c55e', '#ffffff', '#3b82f6'],
      shapes: ['circle']
    });
    setTimeout(() => setActiveSpot(null), 2000);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {spots.current.map((spot, i) => (
        <div 
          key={i} 
          className="absolute pointer-events-auto"
          style={{ top: spot.top, left: spot.left }}
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => triggerSpot(i)}
            className="relative group p-4"
          >
            {/* Green Hot Spot Background */}
            <div className="absolute inset-0 bg-[#22c55e]/10 rounded-full blur-xl group-hover:bg-[#22c55e]/30 transition-all duration-500" />
            <div className="absolute inset-2 bg-[#22c55e]/5 rounded-full border border-[#22c55e]/20 group-hover:border-[#22c55e]/40 transition-all duration-500" />
            
            <Heart 
              size={18} 
              className={`relative z-10 transition-all duration-500 ${activeSpot === i ? 'text-[#22c55e] fill-[#22c55e] scale-125' : 'text-white/10 group-hover:text-white/40'}`} 
            />
            <AnimatePresence>
              {activeSpot === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -40, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border-2 border-[#22c55e] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)] z-20"
                >
                  {spot.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      ))}
    </div>
  );
}

function MatchStatistics() {
  const stats = [
    { label: "Loyalty", value: "100%", color: "bg-[#22c55e]" },
    { label: "Humor", value: "100%", color: "bg-[#3b82f6]" },
    { label: "Kindness", value: "100%", color: "bg-[#a855f7]" },
    { label: "Husband Material", value: "100%", color: "bg-[#22c55e]" },
    { label: "Heart", value: "∞/10", color: "bg-red-500" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-full max-w-sm mx-auto my-8"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
        <Timer size={18} className="text-[#22c55e]" />
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Match Statistics</h4>
      </div>
      <div className="space-y-4">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
              <span className="text-white/40">{stat.label}</span>
              <span className="text-white">{stat.value}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 + (i * 0.1) }}
                className={`h-full ${stat.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PlayerOfTheMatch() {
  return (
    <motion.div 
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      className="absolute -top-12 -right-12 w-32 h-32 z-20 pointer-events-none"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-dashed border-[#d4af37] rounded-full"
        />
        <div className="bg-[#d4af37] w-24 h-24 rounded-full flex flex-col items-center justify-center text-center p-2 shadow-[0_0_30px_rgba(212,175,55,0.4)] border-4 border-white/20">
          <Sparkles size={20} className="text-white mb-1" />
          <span className="text-[10px] font-black leading-none text-white uppercase tracking-tighter">Player of the Match</span>
        </div>
      </div>
    </motion.div>
  );
}

function HusbandMaterialBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="mt-8 bg-[#22c55e] text-black px-8 py-4 rounded-xl font-black text-2xl uppercase tracking-tighter shadow-[0_0_40px_rgba(34,197,94,0.6)] border-4 border-white/20 flex items-center gap-3"
    >
      <Sparkles size={24} />
      100% husband material 🤍⚽️
      <Sparkles size={24} />
    </motion.div>
  );
}

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [pageImages, setPageImages] = useState<Record<PageId, string[]>>(() => {
    const initialImages: Record<string, string[]> = {};
    PAGES.forEach(page => {
      initialImages[page.id] = [...page.images];
    });
    return initialImages as Record<PageId, string[]>;
  });

  const currentPage = PAGES[currentPageIndex];
  const currentImages = pageImages[currentPage.id];

  useEffect(() => {
    if (currentPage.id === '8') {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [currentPage.id]);

  const handleNext = () => {
    if (currentPageIndex < PAGES.length - 1) {
      setDirection(1);
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPageIndex > 0) {
      setDirection(-1);
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Stadium Lights */}
      <div className="stadium-light light-tl" />
      <div className="stadium-light light-tr" />
      <div className="stadium-light light-bl" />
      <div className="stadium-light light-br" />

      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Love Hot Spots (Interactive) */}
      <LoveHotSpots />

      {/* Soccer Pitch Overlay */}
      <div className="soccer-pitch">
        <div className="penalty-area-top" />
        <div className="penalty-area-bottom" />
      </div>

      <main className="w-full max-w-4xl relative glass-card">
        {/* Timeline Header */}
        <div className="relative w-full max-w-md h-12 mx-auto mb-8">
          <div className="timeline-line" />
          <div 
            className={`timeline-ball ${currentPage.id === '8' ? 'end' : ''}`}
            style={{ left: `${currentPage.ballPosition}%` }}
          />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="bg-black/80 border-2 border-[#22c55e] px-4 py-1 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <div className="flex items-center gap-3 scoreboard-font text-xl text-[#22c55e]">
                <Timer size={18} />
                <span>{currentPage.matchTime}</span>
                <Heart size={16} fill="#22c55e" className="animate-pulse" />
              </div>
            </div>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Match Progress</span>
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* Title Section */}
            <header className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-serif italic font-medium text-white"
              >
                {currentPage.title}
              </motion.h1>
            </header>

            {/* Image Section */}
            {currentImages.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`grid gap-4 w-full ${
                  currentPage.id === '5' ? 'grid-cols-2 md:grid-cols-3' : 
                  currentImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {currentImages.map((img, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] md:aspect-auto border-2 border-white/20">
                      <img 
                        src={img} 
                        alt={`Memory ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {currentPage.id === '5' && (
                        <div className="absolute top-3 right-3 bg-black/40 p-2 rounded-full backdrop-blur-sm">
                          <CategoryIcon index={idx} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Text Section */}
            <div className="space-y-6 max-w-2xl w-full">
              {currentPage.text.map((line, idx) => {
                const isTiny = line.startsWith('tiny:');
                const cleanLine = isTiny ? line.replace('tiny:', '').trim() : line;
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className={isTiny ? "text-center mt-4" : "commentary-box"}
                  >
                    <p className={`leading-relaxed ${
                      isTiny 
                        ? 'text-xs text-white/40 italic uppercase tracking-widest' 
                        : `text-lg md:text-xl text-white/90 ${idx === currentPage.text.length - 1 && currentPage.id === '7' ? 'font-bold text-white text-2xl' : ''}`
                    }`}>
                      {cleanLine}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Marriage Contract for Victory Page */}
            {currentPage.id === '8' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="w-full max-w-2xl bg-[#fdfcf0] text-[#2c3e50] rounded-lg p-8 md:p-12 mt-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-[#d4af37] relative font-serif"
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#d4af37] -m-2" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#d4af37] -m-2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#d4af37] -m-2" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#d4af37] -m-2" />

                <div className="text-center mb-10">
                  <h3 className="text-4xl font-bold uppercase tracking-widest mb-2 text-[#b8860b]">Lifetime Transfer Agreement</h3>
                  <p className="text-sm italic opacity-70">Official Club Contract — Season ∞</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Heart size={24} fill="#e11d48" className="text-[#e11d48]" />
                    <Heart size={24} fill="#e11d48" className="text-[#e11d48]" />
                    <Heart size={24} fill="#e11d48" className="text-[#e11d48]" />
                  </div>
                </div>

                <div className="space-y-6 text-lg italic leading-relaxed">
                  <p>
                    This binding agreement confirms that the player has officially signed with the most important club in existence: 
                    <span className="font-bold border-b-2 border-black/20 px-2 mx-1">My Heart FC</span>.
                  </p>
                  
                  <div className="space-y-4 pl-6 border-l-4 border-[#d4af37]/30">
                    <p>• The player agrees to a lifetime of morning coffee, forehead kisses, and unconditional support.</p>
                    <p>• Both parties commit to playing through every season, whether sunny or rainy, with 100% effort.</p>
                    <p>• Substitutions are strictly prohibited. This is a starting position for life.</p>
                  </div>

                  <p className="pt-4">
                    By reaching the final whistle, the terms are hereby ratified and sealed with a promise of forever.
                  </p>

                  <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="w-full md:w-1/2 text-center">
                      <div className="font-handwriting text-4xl text-[#1e3a8a] mb-2">The Captain</div>
                      <div className="h-px w-full bg-black/30 mb-1" />
                      <p className="text-xs uppercase tracking-widest opacity-60">Authorized Signature</p>
                    </div>
                    <div className="w-full md:w-1/2 text-center">
                      <div className="font-handwriting text-4xl text-[#1e3a8a] mb-2">The Star Player</div>
                      <div className="h-px w-full bg-black/30 mb-1" />
                      <p className="text-xs uppercase tracking-widest opacity-60">Authorized Signature</p>
                    </div>
                  </div>
                </div>

                {/* Wax Seal effect */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#8b0000] rounded-full flex items-center justify-center shadow-lg border-4 border-[#a52a2a] rotate-12">
                  <Heart size={40} fill="white" className="text-white" />
                </div>
                <PlayerOfTheMatch />
              </motion.div>
            )}

            {/* VAR Check for Victory Page */}
            {currentPage.id === '8' && <HusbandMaterialBanner />}
            {currentPage.id === '8' && <MatchStatistics />}

            {/* Special Section for Page 5 (Labels) */}
            {currentPage.id === '5' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {[
                  "Song", "Place", "Food", 
                  "Animal", "Feeling", "Moment"
                ].map((label, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Attribute {idx + 1}</div>
                    <div className="text-sm text-[#22c55e] font-bold uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons Section */}
            <footer className="flex flex-col sm:flex-row items-center gap-4 pt-8">
              {currentPageIndex > 0 && currentPage.id !== '8' && (
                <button onClick={handleBack} className="btn-secondary">
                  Previous Play
                </button>
              )}
              
              <div className="flex gap-4">
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  {currentPage.buttonText}
                  {currentPage.id !== '8' && <ChevronRight size={18} />}
                </button>
                
                {currentPage.secondaryButtonText && (
                  <button onClick={handleNext} className="btn-primary bg-[#3b82f6] hover:bg-[#2563eb]">
                    {currentPage.secondaryButtonText}
                  </button>
                )}
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function CategoryIcon({ index }: { index: number }) {
  const icons = [
    <Heart key="0" />,
    <MapPin key="1" />,
    <Utensils key="2" />,
    <Dog key="3" />,
    <Sparkles key="4" />,
    <Camera key="5" />
  ];
  return <div className="text-white scale-150">{icons[index]}</div>;
}
