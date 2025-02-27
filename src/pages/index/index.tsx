// src/pages/index/index.tsx
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import { useGameStore } from "../../store/gameStore";
import DiceContainer from "@/components/dice/DiceContainer";
import ScoreCard from "@/components/ScoreCard";
import GameHeader from "@/components/Header";
import ActionButton from "@/components/AuctionButton";
import { ScoreCategory } from "@/types/types";
import { calculateScore } from "@/utils/scoring";
import Taro from "@tarojs/taro";

const GamePage: FC = () => {
  const { gameState, rollDices, toggleLock, recordScore, resetGame } =
    useGameStore();


  // 处理骰子锁定状态切换
  const handleLockDice = useCallback(
    (index: number) => {
      if (gameState.rollsRemaining < 3) {
        // 至少摇过一次才能锁定
        toggleLock(index);
        Taro.vibrateShort(); // 微信小程序振动反馈
      }
    },
    [gameState.rollsRemaining, toggleLock]
  );

  // 处理计分选择
  const handleScoreSelection = useCallback(
    (category: ScoreCategory) => {
      if (gameState.scores[category] !== null) return;

      const currentDiceValues = gameState.dices.map((d) => d.value);
      const score = calculateScore(category, currentDiceValues);

      recordScore(category, score);

      // 播放音效（需要配置音频文件）
      // const audio = Taro.createInnerAudioContext()
      // audio.src = '/assets/sound/success.mp3'
      // audio.play()
    },
    [gameState.dices, gameState.scores, recordScore]
  );

  // 游戏结束检测
  const isGameEnded = Object.values(gameState.scores).every(
    (score) => score !== null
  );

  // 重置游戏提示
  const showResetDialog = useCallback(() => {
    Taro.showModal({
      title: "重新开始游戏",
      content: "确定要重置当前游戏进度吗？",
      success: (res) => {
        if (res.confirm) resetGame();
      },
    });
  }, [resetGame]);

  useEffect(() => {
    console.log(gameState);
  }, []);
  return (
    <View className="min-h-screen bg-gray-50">
      <GameHeader />

      {/* 骰子容器区域 */}
      <View className="bg-white py-4 shadow-sm">
        <DiceContainer
          dices={gameState.dices}
          onLockToggle={handleLockDice}
        />
        <View className="px-4 flex justify-between items-center">
          <Text className="text-gray-500 text-sm">点击骰子锁定/解锁</Text>
          <Text className="text-blue-500">
            {gameState.rollsRemaining}/3 次剩余
          </Text>
        </View>
      </View>

      {/* 操作按钮组 */}
      <View className="p-4 flex gap-3">
        <ActionButton
          variant="primary"
          onClick={rollDices}
          disabled={gameState.rollsRemaining === 0}
          className='flex-1'
        >
          {gameState.rollsRemaining > 0
            ? `摇骰子 (${gameState.rollsRemaining}次)`
            : "点击重新开始"}
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={showResetDialog}
          className="flex-1"
        >
          重置游戏
        </ActionButton>
      </View>

      {/* 计分板区域 */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">计分板</Text>

        <View className="grid gap-2">
          {Object.entries(gameState.scores).map(([category, score]) => (
            <ScoreCard
              key={category}
              category={category as ScoreCategory}
              score={score}
              isActive={score === null && gameState.rollsRemaining < 3}
              onClick={() => handleScoreSelection(category as ScoreCategory)}
            />
          ))}
        </View>
      </View>

      {/* 游戏结束提示 */}
      {isGameEnded && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <View className="bg-white p-6 rounded-lg max-w-80">
            <Text className="text-xl font-bold mb-4 block">游戏结束！</Text>
            <Text className="text-2xl text-blue-600 block text-center mb-4">
              总分:{" "}
              {Object.values(gameState.scores).reduce(
                (a, b) => (a === null ? 0 : a + (b || 0)),
                0
              )}
            </Text>
            <ActionButton
              variant="primary"
              onClick={resetGame}
              className="w-full"
            >
              开始新游戏
            </ActionButton>
          </View>
        </View>
      )}
    </View>
  );
};

export default GamePage;
