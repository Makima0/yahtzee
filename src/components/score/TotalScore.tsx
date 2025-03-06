// src/components/game/TotalScoreSection.tsx
import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'

interface Props {
  totalScore: number
}

const TotalScoreSection: FC<Props> = ({ totalScore }) => {
  return (
    <View className="p-2">
      <View className="bg-white p-4 rounded-lg shadow">
        <View className="flex justify-between items-center">
          <Text className="text-xl font-bold">总分</Text>
          <Text className="text-2xl text-blue-600 font-bold">{totalScore}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(TotalScoreSection)
