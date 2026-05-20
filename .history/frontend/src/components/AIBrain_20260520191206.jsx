import React from "react";
import { motion } from "framer-motion";

const nodes = [
  { id: 1, x: 50, y: 30, r: 5 }, { id: 2, x: 95, y: 55, r: 4 },
  { id: 3, x: 135, y: 35, r: 5 }, { id: 4, x: 180, y: 60, r: 4 },
  { id: 5, x: 220, y: 35, r: 6 }, { id: 6, x: 245, y: 90, r: 5 },
  { id: 7, x: 215, y: 130, r: 5 }, { id: 8, x: 175, y: 165, r: 6 },
  { id: 9, x: 120, y: 180, r: 5 }, { id: 10, x: 70, y: 170, r: 5 },
  { id: 11, x: 35, y: 130, r: 5 }, { id: 12, x: 25, y: 85, r: 4 },
  { id: 13, x: 110, y: 80, r: 4 }, { id: 14, x: 160, y: 105, r: 7 },
  { id: 15, x: 85, y: 125, r: 4 }, { id: 16, x: 200, y: 100, r: 4 },
];

const edges = [
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,1],
  [13,14],[14,16],[13,15],[15,9],[14,6],[13,2],[14,5],[15,10],[16,7],[13,3],
  [14,8],[15,11],[1,13],[3,13],[5,16],[11,15],[8,14],[12,15],
];

const AIBrain = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-[360px] mx-auto"
      data-testid="ai-brain"
    >
      <div className="relative animate-float-slow">
        <div className="absolute inset-0 -m-8 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute inset-0 -m-4 rounded-full bg-cyan-400/10 blur-3xl" />

        <svg viewBox="0 0 280 220"
             className="relative w-full h-auto drop-shadow-[0_0_30px_rgba(139,92,246,0.55)]">
          <defs>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="40%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="nodeGradCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="40%" stopColor="#67e8f9" stopOpacity="1" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.55" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <path
            d="M50,90 C40,55 80,25 130,30 C175,15 235,40 240,90 C260,120 240,170 195,180 C170,210 110,210 80,180 C30,175 25,120 50,90 Z"
            fill="none" stroke="url(#edgeGrad)" strokeWidth="1"
            strokeDasharray="4 6" opacity="0.35"
          />

          {edges.map(([a, b], i) => {
            const na = nodes.find((n) => n.id === a);
            const nb = nodes.find((n) => n.id === b);
            return (
              <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="url(#edgeGrad)" strokeWidth="0.8" opacity="0.7" filter="url(#glow)">
                <animate attributeName="opacity" values="0.3;0.9;0.3"
                         dur={`${3 + (i % 4)}s`} repeatCount="indefinite"
                         begin={`${(i % 7) * 0.3}s`} />
              </line>
            );
          })}

          {nodes.map((n, i) => (
            <g key={n.id} filter="url(#glow)">
              <circle cx={n.x} cy={n.y} r={n.r}
                      fill={i % 3 === 0 ? "url(#nodeGradCyan)" : "url(#nodeGrad)"}>
                <animate attributeName="r"
                         values={`${n.r};${n.r + 1.6};${n.r}`}
                         dur={`${2.5 + (i % 5) * 0.4}s`}
                         repeatCount="indefinite"
                         begin={`${(i % 6) * 0.25}s`} />
              </circle>
            </g>
          ))}

          <circle r="2" fill="#67e8f9" filter="url(#glow)">
            <animateMotion dur="3.5s" repeatCount="indefinite"
                           path="M50,30 L95,55 L135,35 L180,60 L220,35" />
          </circle>
          <circle r="2" fill="#a78bfa" filter="url(#glow)">
            <animateMotion dur="4s" repeatCount="indefinite"
                           path="M245,90 L215,130 L175,165 L120,180 L70,170" />
          </circle>
        </svg>
      </div>
    </motion.div>
  );
};

export default AIBrain;