// src/pages/index/index.tsx
import { FC, useCallback, useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import { useGameStore } from '@/store/gameStore'
import DiceContainer from '@/components/dice/DiceContainer'
import ScoreCard from '@/components/score/ScoreCard'
import GameHeader from '@/components/Header'
import ActionButton from '@/components/AuctionButton'
import { ScoreCategory } from '@/types/types'
import { calculateScore } from '@/utils/scoring'
import Taro from '@tarojs/taro'

// 基础得分项和组合得分项分类
const BASIC_CATEGORIES: ScoreCategory[] = [
  'Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'
];

const COMBINATION_CATEGORIES: ScoreCategory[] = [
  'FullHouse', 'FourOfAKind', 'LittleStraight', 'BigStraight', 'Choice', 'Yacht'
];

// 基础得分奖励阈值和数额
const BONUS_THRESHOLD = 63;
const BONUS_AMOUNT = 35;

const GamePage: FC = () => {
  const {
    gameState,
    rollDices,
    toggleLock,
    recordScore,
    resetGame
  } = useGameStore()

  // 处理骰子锁定状态切换
  const handleLockDice = useCallback((index: number) => {
    if (gameState.rollsRemaining < 3) {
      toggleLock(index)
      Taro.vibrateShort()
    }
  }, [gameState.rollsRemaining, toggleLock])

  // 计算所有分类的预览分数
  const previewScores = useMemo(() => {
    if (gameState.rollsRemaining === 3) return {}

    const currentDiceValues = gameState.dices.map(d => d.value)
    const result: Partial<Record<ScoreCategory, number>> = {}

    Object.entries(gameState.scores).forEach(([category, score]) => {
      if (score === null) {
        const categoryKey = category as ScoreCategory
        result[categoryKey] = calculateScore(categoryKey, currentDiceValues)
      }
    })

    return result
  }, [gameState.dices, gameState.rollsRemaining, gameState.scores])

  // 处理计分选择
  const handleScoreSelection = useCallback((category: ScoreCategory) => {
    if (gameState.scores[category] !== null) return

    const currentDiceValues = gameState.dices.map(d => d.value)
    const score = calculateScore(category, currentDiceValues)
    
    recordScore(category, score)
  }, [gameState.dices, gameState.scores, recordScore])

  // 计算基础得分总和
  const basicScoresTotal = useMemo(() => {
    return BASIC_CATEGORIES.reduce((total, category) => {
      return total + (gameState.scores[category] || 0)
    }, 0)
  }, [gameState.scores])

  // 判断是否获得基础分奖励
  const bonusEarned = basicScoresTotal >= BONUS_THRESHOLD;

  // 计算总分（包括基础分、奖励和组合分）
  const totalScore = useMemo(() => {
    const allScoresSum = Object.values(gameState.scores).reduce(
      (total, score) => total===null?0:total + (score || 0), 0
    );
    return allScoresSum===null?0:allScoresSum + (bonusEarned ? BONUS_AMOUNT : 0)
  }, [gameState.scores, bonusEarned])

  // 游戏结束检测
  const isGameEnded = Object.values(gameState.scores).every(
    score => score !== null
  )

  // 重置游戏提示
  const showResetDialog = useCallback(() => {
    Taro.showModal({
      title: '重新开始游戏',
      content: '确定要重置当前游戏进度吗？',
      success: (res) => {
        if (res.confirm) resetGame()
      }
    })
  }, [resetGame])

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
          <Text className="text-gray-500 text-sm">
            点击骰子锁定/解锁
          </Text>
          <Text className={`${gameState.rollsRemaining === 0 ? 'text-red-500' : 'text-blue-500'}`}>
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
          className="flex-1"
        >
          {gameState.rollsRemaining > 0 ? (
            `摇骰子 (${gameState.rollsRemaining}次)`
          ) : (
            '无法再摇骰子'
          )}
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
        <View className="score-board flex flex-row" style={{ display: 'flex', flexDirection: 'row' }}>
          <View className="score-column" style={{ flex: 1, marginRight: '8px' }}>
            <View className="bg-white p-3 rounded-lg shadow">
              <Text className="text-base font-bold mb-2">基础得分项</Text>
              
              <View>
                {BASIC_CATEGORIES.map(category => (
                  <ScoreCard
                    key={category}
                    category={category}
                    score={gameState.scores[category]}
                    previewScore={previewScores[category]}
                    isActive={gameState.scores[category] === null && gameState.rollsRemaining < 3}
                    onClick={() => handleScoreSelection(category)}
                    compact={true}
                  />
                ))}
              </View>
              
              {/* 基础得分总和与奖励 */}
              <View className="mt-2 border-t pt-2">
                <View className="flex justify-between items-center">
                  <Text className="text-sm">基础得分:</Text>
                  <Text className="text-base">{basicScoresTotal}/63</Text>
                </View>
                
                <View className="flex justify-between items-center">
                  <Text className="text-sm">奖励:</Text>
                  <Text className={`text-base ${bonusEarned ? 'text-green-500' : 'text-gray-400'}`}>
                    {bonusEarned ? `+${BONUS_AMOUNT}` : '0'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* 组合得分项 */}
          <View className="score-column" style={{ flex: 1, marginLeft: '8px' }}>
            <View className="bg-white p-3 rounded-lg shadow">
              <Text className="text-base font-bold mb-2">组合得分项</Text>
              <View>
                {COMBINATION_CATEGORIES.map(category => (
                  <ScoreCard
                    key={category}
                    category={category}
                    score={gameState.scores[category]}
                    previewScore={previewScores[category]}
                    isActive={gameState.scores[category] === null && gameState.rollsRemaining < 3}
                    onClick={() => handleScoreSelection(category)}
                    compact={true}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
        
        {/* 总分显示 */}
        <View className="bg-white p-4 rounded-lg shadow mt-4">
          <View className="flex justify-between items-center">
            <Text className="text-xl font-bold">总分</Text>
            <Text className="text-2xl text-blue-600 font-bold">{totalScore}</Text>
          </View>
        </View>
      </View>
      {/* 游戏结束提示 */}
      {isGameEnded && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <View className="bg-white p-6 rounded-lg max-w-80">
            <Text className="text-xl font-bold mb-4 block">游戏结束！</Text>
            <Text className="text-2xl text-blue-600 block text-center mb-2">
              总分: {totalScore}
            </Text>
            {bonusEarned && (
              <Text className="text-green-500 text-center mb-4">
                (包含基础分奖励 +{BONUS_AMOUNT}分)
              </Text>
            )}
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
  )
}

export default GamePage
