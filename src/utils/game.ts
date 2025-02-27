import { DiceState, ScoreCategory } from "@/types/types";

// src/utils/game.ts
export const initializeDices = (): DiceState[] =>
  Array(5)
    .fill(null)
    .map(() => ({
      value: 1,
      isLocked: false,
      isRolling: false,
    }));

export const calculateTotalScore = (
  scores: Record<ScoreCategory, number>
): number => {
  return Object.values(scores).reduce(
    (total, score) => total + (score || 0),
    0
  );
};
