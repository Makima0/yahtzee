// src/components/ScoreCard.tsx
import { FC, memo } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { ScoreCategory } from '@/types/types'

interface Props {
  category: ScoreCategory
  score: number | null
  previewScore?: number | null
  isActive?: boolean
  onClick: () => void
  compact?: boolean
}

const ScoreCard: FC<Props> = ({ 
  category, 
  score, 
  previewScore = null,
  isActive = false, 
  onClick,
  compact = false
}) => {
  // 分类中文名称映射
  const categoryLabels: Record<ScoreCategory, string> = {
    // 基础分类
    Ones: '一点',
    Twos: '二点',
    Threes: '三点',
    Fours: '四点',
    Fives: '五点',
    Sixes: '六点',
    // 组合分类
    FullHouse: '葫芦',
    FourOfAKind: '四骰同花',
    LittleStraight: '小顺子',
    BigStraight: '大顺子',
    Choice: '全选',
    Yacht: '快艇'
  }

  // 精简的规则描述（紧凑模式使用）
  const shortDescriptions: Record<ScoreCategory, string> = {
    Ones: '1点总和',
    Twos: '2点总和',
    Threes: '3点总和',
    Fours: '4点总和',
    Fives: '5点总和',
    Sixes: '6点总和',
    FullHouse: '三同+二同',
    FourOfAKind: '四同',
    LittleStraight: '小顺(30分)',
    BigStraight: '大顺(30分)',
    Choice: '总和',
    Yacht: '快艇(50分)'
  }

  return (
    <View className={`${compact ? 'p-2 mb-1' : 'p-3 mb-2'} rounded-lg border 
      ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      ${score !== null ? 'bg-gray-50' : ''}`}>
      <View className="flex justify-between items-center">
        <View className={compact ? 'w-1/2' : ''}>
          <Text className={compact ? 'text-base font-medium' : 'text-lg font-medium'}>
            {categoryLabels[category]}
          </Text>
          {!compact && (
            <Text className="text-gray-500 text-xs block">
              {shortDescriptions[category]}
            </Text>
          )}
        </View>
        
        <View className="flex items-center">
          {score !== null ? (
            // 已记录的分数
            <Text className={compact ? 'text-lg font-bold' : 'text-xl font-bold'}>
              {score}
            </Text>
          ) : (
            <>
              {/* 预览分数显示 */}
              {previewScore !== null && (
                <View className="flex items-center mr-2">
                  {compact ? (
                    <Text className={`text-base ${previewScore > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                      {previewScore}
                    </Text>
                  ) : (
                    <View className="flex flex-col items-end">
                      <Text className="text-gray-500 text-xs">可得</Text>
                      <Text className={`text-lg ${previewScore > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                        {previewScore}
                      </Text>
                    </View>
                  )}
                </View>
              )}
              
              {/* 选择按钮 */}
              <Button
                className={`${compact ? 'px-2 py-0 text-xs' : 'px-4 py-1 text-sm'} rounded-full
                  ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={onClick}
                disabled={!isActive}
              >
                选择
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default memo(ScoreCard)
