'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Visual3DProps {
  onScore: (points: number) => void;
  onComplete: () => void;
}

// Simple representation of blocks: multiple cubes in 3D space
type Shape = [number, number, number][];

// Polycubes & Complex Shapes
const SHAPES: Shape[] = [
  // L-shape with extra block (Tetris-like + 1)
  [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0], [0, 0, 1]],
  // The 'Chair' + twist
  [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1], [0, 1, 0]],
  // Cross 3D
  [[1, 1, 1], [0, 1, 1], [2, 1, 1], [1, 0, 1], [1, 2, 1], [1, 1, 0], [1, 1, 2]],
  // Snake
  [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1], [2, 1, 1]],
  // U-shape 3D
  [[0, 0, 0], [2, 0, 0], [0, 1, 0], [2, 1, 0], [0, 0, 1], [2, 0, 1], [1, 0, 1]],
  // Pyramid-ish
  [[1, 1, 1], [0, 0, 0], [2, 0, 0], [0, 2, 0], [2, 2, 0]],
  // Spiral small
  [[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0], [1, 2, 0], [0, 2, 0]],
  // Random Cluster
  [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 1]],
];

// Helper to render a single shape
const BlockShape = ({ shape, rotation = [0, 0, 0], scale = 0.8 }: { shape: Shape, rotation?: [number, number, number], scale?: number }) => {
  return (
    <div className="relative w-40 h-40 preserve-3d" style={{ perspective: '800px' }}>
      <div
        className="absolute inset-0 w-full h-full preserve-3d transition-transform duration-700 ease-out"
        style={{
          transform: `rotateX(${rotation[0]}deg) rotateY(${rotation[1]}deg) rotateZ(${rotation[2]}deg) scale(${scale})`
        }}
      >
        {shape.map((pos, idx) => (
          <div
            key={idx}
            className="absolute w-10 h-10 border border-white/20 bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{
              transform: `translate3d(${pos[0] * 40 - 40}px, ${pos[1] * -40 + 40}px, ${pos[2] * 40}px)`,
            }}
          >
            {/* Cube faces for 3D effect */}
            <div className="absolute inset-0 bg-blue-400/30 translate-z-5" />
            <div className="absolute inset-0 bg-blue-600/30 -translate-z-5" />
            <div className="absolute inset-0 bg-blue-500/30 rotate-y-90" />
            <div className="absolute inset-0 bg-blue-500/30 -rotate-y-90" />
            <div className="absolute inset-0 bg-blue-300/30 rotate-x-90" />
            <div className="absolute inset-0 bg-blue-700/30 -rotate-x-90" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Visual3D({ onScore }: Visual3DProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0); // Display only
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isCorrectFirst, setIsCorrectFirst] = useState(true);

  // Random rotation generator
  const getRandomRotation = (): [number, number, number] => {
    return [
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 360)
    ];
  };

  const [currentShapeIdx, setCurrentShapeIdx] = useState(0);
  const [foilShapeIdx, setFoilShapeIdx] = useState(1);
  const [baseRotation, setBaseRotation] = useState<[number, number, number]>([20, 30, 0]);
  const [correctRotation, setCorrectRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [foilRotation, setFoilRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Init/Next Level
  useEffect(() => {
    setupLevel();
  }, [currentLevel]);

  const setupLevel = () => {
    setIsCorrectFirst(Math.random() > 0.5);

    const sIdx = Math.floor(Math.random() * SHAPES.length);
    let fIdx = Math.floor(Math.random() * SHAPES.length);
    while (fIdx === sIdx) {
      fIdx = Math.floor(Math.random() * SHAPES.length);
    }

    setCurrentShapeIdx(sIdx);
    setFoilShapeIdx(fIdx);

    setBaseRotation(getRandomRotation());
    setCorrectRotation(getRandomRotation());
    setFoilRotation(getRandomRotation());
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(s => s + 8);
      onScore(8);
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        setCurrentLevel(l => l + 1);
      }, 800);
    } else {
      setFeedback('wrong');
      // No penalty? or maybe small?
      setTimeout(() => {
        setFeedback(null);
        // Retry or next? usually next or stay.
      }, 800);
    }
  };

  const currentShape = SHAPES[currentShapeIdx];
  const foilShape = SHAPES[foilShapeIdx];

  return (
    <div className="flex flex-col items-center h-full gap-8">
      <div className="flex flex-col items-center">
        <h3 className="text-zinc-400 mb-4 tracking-widest text-sm">TARGET</h3>
        <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5">
          <BlockShape shape={currentShape} rotation={baseRotation} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl px-4">
        {/* Option 1 */}
        <button
          onClick={() => handleAnswer(isCorrectFirst)}
          className="flex flex-col items-center p-6 bg-zinc-800/30 hover:bg-zinc-800 rounded-xl border border-white/10 transition-all group"
        >
          <span className="mb-4 text-zinc-500 font-bold group-hover:text-blue-400">OPTION A</span>
          <BlockShape
            shape={isCorrectFirst ? currentShape : foilShape}
            rotation={isCorrectFirst ? correctRotation : foilRotation}
          />
        </button>

        {/* Option 2 */}
        <button
          onClick={() => handleAnswer(!isCorrectFirst)}
          className="flex flex-col items-center p-6 bg-zinc-800/30 hover:bg-zinc-800 rounded-xl border border-white/10 transition-all group"
        >
          <span className="mb-4 text-zinc-500 font-bold group-hover:text-blue-400">OPTION B</span>
          <BlockShape
            shape={!isCorrectFirst ? currentShape : foilShape}
            rotation={!isCorrectFirst ? correctRotation : foilRotation}
          />
        </button>
      </div>

      {feedback && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className={`absolute inset-0 flex items-center justify-center bg-black/40 z-50 pointer-events-none`}
        >
          {feedback === 'correct' ? (
            <Check className="text-green-500 w-32 h-32 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
          ) : (
            <X className="text-red-500 w-32 h-32 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
          )}
        </motion.div>
      )}

      <div className="absolute bottom-4 right-4 font-mono text-zinc-500">
        SCORE: {score}
      </div>
    </div>
  );
}
