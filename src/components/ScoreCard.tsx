// src/components/ScoreCard.tsx
import { FC, memo } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { ScoreCategory } from '../types/types'

interface Props {
  category: ScoreCategory
  score: number | null
  isActive?: boolean
  onClick: () => void
}

const ScoreCard: FC<Props> = ({ category, score, isActive, onClick }) => {
  const categoryLabels: Record<ScoreCategory, string> = {
    Ones: '一点',
    Twos: '二点',
    Threes: '三点',
    Fours: '四点',
    Fives: '五点',
    Sixes: '六点',
    FullHouse: '葫芦',
    FourOfAKind: '四骰同花',
    LittleStraight: '小顺子',
    BigStraight: '大顺子',
    Choice: '全选',
    Yacht: '快艇'
  }

  return (
    <View className={`p-3 mb-3 rounded-lg border 
      ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <View className="flex justify-between items-center">
        <View>
          <Text className="text-lg font-medium">{categoryLabels[category]}</Text>
          <Text className="text-gray-500 text-sm">{category}</Text>
        </View>
        
        <View className="flex items-center">
          {score !== null ? (
            <Text className="text-xl font-bold mr-4">{score}</Text>
          ) : (
            <Button
              className={`px-4 py-1 rounded-full text-sm
                ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={()=>{onClick()
                console.log(isActive);
                
              }}
              disabled={!isActive}
            >
              {isActive ? '确认选择' : '选择'}
            </Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default memo(ScoreCard)
