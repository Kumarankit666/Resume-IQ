import React, { useMemo } from "react";

const Background = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.6,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
    }));
  }, []);

  return (
    <>
      <div className="bg-aurora" />
      <div className="bg-grid" />
      <div className="fixed inset-0 pointer-events-none z-0" data-testid="particles-bg">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle animate-twinkle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Background;