// src/components/HistoryItem.tsx
import { FC } from 'react'
import { View, Text } from '@tarojs/components'
import { GameRecord } from '../types/types'

interface Props {
  record: GameRecord
}

const HistoryItem: FC<Props> = ({ record }) => {
  return (
    <View className="p-4 mb-3 bg-white rounded-lg shadow-sm">
      <View className="flex justify-between items-center mb-2">
        <Text className="text-gray-500 text-sm">
          {new Date(record.date).toLocaleDateString()}
        </Text>
        <Text className="text-xl font-bold text-blue-600">
          {record.totalScore} 分
        </Text>
      </View>
      
      <View className="grid grid-cols-3 gap-2">
        {Object.entries(record.roundScores).map(([category, score]) => (
          <View key={category} className="text-center">
            <Text className="text-xs text-gray-500 block">{category}</Text>
            <Text className="text-sm font-medium">{score}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default HistoryItem
