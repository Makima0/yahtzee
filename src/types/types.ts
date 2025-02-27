export type DiceFace = 1 | 2 | 3 | 4 | 5 | 6

export interface DiceAnimationConfig {
  duration: number;
  timingFunction: "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out";
  transformOrigin: string;
}

export type ScoreCategory = 
  | 'Ones' | 'Twos' | 'Threes' | 'Fours' | 'Fives' | 'Sixes'
  | 'FullHouse' | 'FourOfAKind' | 'LittleStraight' | 'BigStraight' 
  | 'Choice' | 'Yacht'

  
  export type GameHistory = {
    date: string
    totalScore: number
    rounds: number
  }
  
  export type Settings = {
    sound: boolean
    vibration: boolean
  }
  // 骰子相关类型

export type DiceState = {
  value: DiceFace
  isLocked: boolean
}

// 计分规则类型

export interface ScoreRule {
  category: ScoreCategory
  description: string
  calculate: (dices: DiceFace[]) => number
}

// 游戏状态类型
export interface GameState {
  dices: DiceState[]
  rollsRemaining: number
  scores: Record<ScoreCategory, number|null>
  currentRound: number
  gameHistory: GameRecord[]
}

export interface GameRecord {
  date: string
  totalScore: number
  roundScores: Record<ScoreCategory, number>
}

// 组件 Props 类型
export interface DiceContainerProps {
  dices: DiceState[]
  onLockToggle: (index: number) => void
}

export interface ScoreCardProps {
  category: ScoreCategory
  score: number | null
  onScoreSelect: () => void
}

export interface RuleItem {
  category: ScoreCategory
  description: string
  example: string
  scoringFormula: string
}
export type GameStatus = 'playing' | 'scoring' | 'ended'
