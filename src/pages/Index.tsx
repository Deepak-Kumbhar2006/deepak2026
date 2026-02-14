import { useState, useEffect, useCallback, useRef } from "react";
import valentinePhoto from "@/assets/valentine-photo.jpg";

const noTexts = ["NO", "Are you sure?", "Think again", "Wrong choice 😤", "Not allowed!", "Try again 😏", "Nope!"];

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 20 + 12}px`,
    delay: `${Math.random() * 8}s`,
    duration: `${Math.random() * 6 + 6}s`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
          }}
        >
          💜
        </span>
      ))}
    </div>
  );
};

const Confetti = () => {
  const colors = ["#ff6b9d", "#c44dff", "#ff85c8", "#ffd700", "#ff4081", "#e040fb"];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bg: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 2}s`,
    duration: `${Math.random() * 2 + 2}s`,
    size: `${Math.random() * 8 + 6}px`,
  }));

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece rounded-sm"
          style={{
            left: p.left,
            backgroundColor: p.bg,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </>
  );
};

// Screen 1: The Hook
const HookScreen = ({ onContinue }: { onContinue: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in relative z-10">
    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-300 via-primary to-purple-400 bg-clip-text text-transparent leading-tight">
      Hey Netrali, I need 10 seconds of your life…
    </h1>
    <button
      onClick={onContinue}
      className="glow-btn mt-6 px-10 py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold transition-all duration-300 hover:scale-110 hover:brightness-110"
    >
      Continue 💜
    </button>
  </div>
);

// Screen 2: The Big Question
const QuestionScreen = ({ onYes }: { onYes: () => void }) => {
  const [noIndex, setNoIndex] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    const maxX = window.innerWidth < 640 ? 150 : 250;
    const maxY = window.innerWidth < 640 ? 200 : 150;
    setNoPos({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
    setNoIndex((prev) => (prev + 1) % noTexts.length);
    setYesScale((prev) => Math.min(prev + 0.05, 1.4));
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
        Will you be my Valentine? 💕
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 items-center relative">
        <button
          onClick={onYes}
          className="glow-btn px-12 py-5 rounded-full bg-primary text-primary-foreground text-xl font-bold transition-all duration-300 hover:brightness-110"
          style={{ transform: `scale(${yesScale})` }}
        >
          YES 💖
        </button>
        <button
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="px-12 py-5 rounded-full bg-secondary text-secondary-foreground text-xl font-bold transition-all duration-300 hover:bg-muted"
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {noTexts[noIndex]}
        </button>
      </div>
    </div>
  );
};

// Screen 3: The Romantic Reveal
const RevealScreen = ({ onContinue }: { onContinue: () => void }) => {
  const sparkles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${i * 0.3}s`,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 animate-fade-in relative z-10"
      style={{ background: "linear-gradient(135deg, hsl(280 40% 15%), hsl(330 50% 20%), hsl(270 40% 12%))" }}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle fixed text-2xl pointer-events-none z-0"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          ✨
        </span>
      ))}
      <div className="relative bg-foreground/95 p-3 pb-16 rounded shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-xs sm:max-w-sm">
        <img
          src={valentinePhoto}
          alt="Us together"
          className="w-full aspect-square object-cover rounded-sm"
        />
        <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-background/80 italic">
          My favorite person 💜
        </p>
      </div>
      <h2 className="text-2xl sm:text-4xl font-bold mt-10 mb-4 text-foreground">
        Yeah I know you never gonna say no 😉😙
      </h2>
      <p className="text-muted-foreground text-lg mb-8">Happy Valentine's Day, Netrali 💕</p>
      <button
        onClick={onContinue}
        className="glow-btn px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
      >
        One more thing… 👀
      </button>
    </div>
  );
};

// Screen 4: The Funny Finale
const FinaleScreen = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const speed = progress > 85 ? 150 : progress > 60 ? 80 : 40;
      const timer = setTimeout(() => setProgress((p) => Math.min(p + 1, 100)), speed);
      return () => clearTimeout(timer);
    } else {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in relative z-10">
      {done && <Confetti />}
      <h1 className="text-3xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
        Compatibility Score
      </h1>
      {!done ? (
        <div className="w-full max-w-md">
          <div className="relative h-6 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-muted-foreground text-lg">Calculating… {progress}%</p>
        </div>
      ) : (
        <div className="animate-scale-in">
          <p className="text-7xl sm:text-9xl font-black bg-gradient-to-r from-pink-400 via-primary to-purple-400 bg-clip-text text-transparent">
            100000%
          </p>
          <p className="text-xl sm:text-2xl text-muted-foreground mt-6">
            Like there was ever any doubt 😏💜
          </p>
          <p className="text-foreground mt-8 text-lg">
            Forever yours, happy Valentine's Day! 🥰
          </p>
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const [screen, setScreen] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(270 50% 10%), hsl(300 40% 15%), hsl(330 50% 18%))" }}>
      <FloatingHearts />
      {screen === 0 && <HookScreen onContinue={() => setScreen(1)} />}
      {screen === 1 && <QuestionScreen onYes={() => setScreen(2)} />}
      {screen === 2 && <RevealScreen onContinue={() => setScreen(3)} />}
      {screen === 3 && <FinaleScreen />}
    </div>
  );
};

export default Index;
