// src/components/ScoreProgress.tsx
import { FC } from 'react'
import { View, Text, Progress } from '@tarojs/components'

interface Props {
  current: number;
  target: number;
  label: string;
  bonus?: number;
  earned?: boolean;
}

const ScoreProgress: FC<Props> = ({ 
  current, 
  target, 
  label, 
  bonus = 0,
  earned = false
}) => {
  // 计算进度百分比，限制在0-100之间
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));
  
  return (
    <View className="mb-4">
      <View className="flex justify-between items-center mb-1">
        <Text className="text-sm font-medium">{label}</Text>
        <View className="flex items-center">
          <Text className="text-sm font-medium">{current}/{target}</Text>
          {bonus > 0 && (
            <Text className={`ml-2 text-sm ${earned ? 'text-green-500' : 'text-gray-400'}`}>
              {earned ? `+${bonus}` : ''}
            </Text>
          )}
        </View>
      </View>
      
      <Progress 
        percent={percentage}
        strokeWidth={8}
        activeColor={earned ? '#10B981' : '#3B82F6'}
        backgroundColor="#E5E7EB"
        active
        activeMode="forwards"
      />
    </View>
  )
}

export default ScoreProgress
