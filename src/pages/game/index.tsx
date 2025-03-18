// src/pages/index/index.tsx
import { FC } from "react";
import { View } from "@tarojs/components";
import { useGameFlow } from "@/hooks/useGameFlow";
import GameHeader from "@/components/header/Header";
import DiceSection from "@/components/dice/DiceSection";
import ActionButtons from "@/components/buttons/AuctionButtons";
import ScoreBoard from "@/components/score/ScoreBoard";
import TotalScoreSection from "@/components/score/TotalScore";
import GameEndModal from "@/components/modal/GameEndModal";
import Taro from "@tarojs/taro";

const GamePage: FC = () => {
  const gameFlow = useGameFlow();

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 游戏头部信息 */}
      <GameHeader
        currentRound={gameFlow.gameState.currentRound}
        rollsRemaining={gameFlow.gameState.rollsRemaining}
      />

      {/* 骰子区域 */}
      <DiceSection
        dices={gameFlow.gameState.dices}
        isRolling={gameFlow.isRolling}
        onLockToggle={gameFlow.handleLockDice}
      />

      {/* 操作按钮 */}
      <ActionButtons
        onRoll={gameFlow.handleRollDice}
        onReset={gameFlow.handleResetGame}
        rollsRemaining={gameFlow.gameState.rollsRemaining}
        isRolling={gameFlow.isRolling}
      />
      {/* 总分显示 */}
      <TotalScoreSection totalScore={gameFlow.totalScore} />

      {/* 计分板 */}
      <ScoreBoard
        scores={gameFlow.gameState.scores}
        previewScores={gameFlow.previewScores}
        basicScoresTotal={gameFlow.basicScoresTotal}
        bonusEarned={gameFlow.bonusEarned}
        onScoreSelect={gameFlow.handleScoreSelection}
        rollsRemaining={gameFlow.gameState.rollsRemaining}
      />

      {/* 游戏结束弹窗 */}

      {gameFlow.isGameEnded && (
        <GameEndModal
          totalScore={gameFlow.totalScore}
          bonusEarned={gameFlow.bonusEarned}
          bonusAmount={gameFlow.BONUS_AMOUNT}
          onNewGame={gameFlow.resetGame}
          onBackToHome={() => Taro.navigateBack()}
        />
      )}
    </View>
  );
};

export default GamePage;
