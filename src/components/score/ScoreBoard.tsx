// src/components/game/ScoreBoard.tsx
import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import ScoreCard from '@/components/score/ScoreCard'
import { ScoreCategory } from '@/types/types'
import { BASIC_CATEGORIES, COMBINATION_CATEGORIES } from '@/constants/gameCategories'

interface Props {
  scores: Record<ScoreCategory, number | null>
  previewScores: Partial<Record<ScoreCategory, number>>
  basicScoresTotal: number
  bonusEarned: boolean
  onScoreSelect: (category: ScoreCategory) => void
  rollsRemaining: number
}

const ScoreBoard: FC<Props> = ({ 
  scores, 
  previewScores, 
  basicScoresTotal, 
  bonusEarned,
  onScoreSelect, 
  rollsRemaining 
}) => {
  const BONUS_THRESHOLD = 63
  const BONUS_AMOUNT = 35
  
  return (
    <View className="p-4">
      <View className="flex flex-row" style={{ display: 'flex', flexDirection: 'row' }}>
        {/* 基础得分项 */}
        <View className="score-column" style={{ flex: 1, marginRight: '8px' }}>
          <View className="bg-white p-2 rounded-lg shadow">
            <Text className="text-base font-bold mb-2">基础得分项</Text>
            
            <View>
              {BASIC_CATEGORIES.map(category => (
                <ScoreCard
                  key={category}
                  category={category}
                  score={scores[category]}
                  previewScore={previewScores[category]}
                  isActive={scores[category] === null && rollsRemaining < 3}
                  onClick={() => onScoreSelect(category)}
                  compact={true}
                />
              ))}
            </View>
            
            {/* 基础得分总和与奖励 */}
            <View className="mt-2 border-t pt-2">
              <View className="flex justify-between items-center">
                <Text className="text-sm">基础得分:</Text>
                <Text className="text-base">{basicScoresTotal}/{BONUS_THRESHOLD}</Text>
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
          <View className="bg-white p-2 rounded-lg shadow">
            <Text className="text-base font-bold mb-2">组合得分项</Text>
            <View>
              {COMBINATION_CATEGORIES.map(category => (
                <ScoreCard
                  key={category}
                  category={category}
                  score={scores[category]}
                  previewScore={previewScores[category]}
                  isActive={scores[category] === null && rollsRemaining < 3}
                  onClick={() => onScoreSelect(category)}
                  compact={true}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default memo(ScoreBoard)
