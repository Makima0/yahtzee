import { DiceFace, GameState, ScoreCategory } from "src/types/types";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, } from "zustand/middleware";
import { weappStorage } from "./weappStorage";

export type GameStore = {
  gameState: GameState;
  rollDices: () => void;
  toggleLock: (index: number) => void;
  recordScore: (category: ScoreCategory, score: number) => void;
  resetGame: () => void;
};

const initialState: GameState = {
  dices: Array(5).fill({ value: 1, isLocked: false }),
  rollsRemaining: 3,
  scores: {
    Ones: null,
    Twos: null,
    Threes: null,
    Fours: null,
    Fives: null,
    Sixes: null,
    FullHouse: null,
    FourOfAKind: null,
    LittleStraight: null,
    BigStraight: null,
    Choice: null,
    Yacht: null,
  },
  currentRound: 1,
  gameHistory: [],
};

const weappJsonStorage = createJSONStorage(() => ({
  getItem: (name) => weappStorage.getItem(name),
  setItem: (name, value) => weappStorage.setItem(name, value),
  removeItem: (name) => weappStorage.removeItem(name),
}));

export const useGameStore = create<GameStore>(
  persist(
    (set) => ({
      gameState: initialState,

      rollDices: () =>
        set((state) => {
          const newDices = state.gameState.dices.map((dice) =>
            dice.isLocked
              ? dice
              : {
                  value: Math.ceil(Math.random() * 6) as DiceFace,
                  isLocked: false,
                }
          );
          return {
            gameState: {
              ...state.gameState,
              dices: newDices,
              rollsRemaining: state.gameState.rollsRemaining - 1,
            },
          };
        }),

      toggleLock: (index: number) =>
        set((state) => {
          const newDices = [...state.gameState.dices];
          newDices[index].isLocked = !newDices[index].isLocked;
          return { gameState: { ...state.gameState, dices: newDices } };
        }),

      recordScore: (category, score) =>
        set((state) => ({
          gameState: {
            ...state.gameState,
            scores: { ...state.gameState.scores, [category]: score },
            currentRound: state.gameState.currentRound + 1,
            rollsRemaining: 3,
            dices: initialState.dices,
          },
        })),

      resetGame: () => set({ gameState: initialState }),
    }),
    {
      name: "game-storage",
      storage: weappJsonStorage,
    }
  ) as StateCreator<GameStore>
);
