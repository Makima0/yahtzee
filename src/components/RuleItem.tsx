// src/components/RuleItem.tsx
import { FC } from 'react'
import { View, Text } from '@tarojs/components'
import { ScoreCategory } from '../types/types'

interface Props {
  category: ScoreCategory
  description: string
  example?: string
}

const RuleItem: FC<Props> = ({ category, description, example }) => {
  return (
    <View className="mb-4 p-3 bg-white rounded-lg shadow-sm">
      <View className="flex justify-between items-start mb-2">
        <Text className="text-lg font-medium text-gray-800">{category}</Text>
        <Text className="text-sm text-gray-500">示例: {example}</Text>
      </View>
      <Text className="text-gray-600 leading-relaxed">{description}</Text>
    </View>
  )
}

export default RuleItem
