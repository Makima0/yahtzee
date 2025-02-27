// src/components/GameHeader.tsx
import { FC } from 'react'
import { View, Text } from '@tarojs/components'
import { useGameStore } from '../store/gameStore'

const GameHeader: FC = () => {
  const { rollsRemaining, currentRound } = useGameStore(
    (state) => state.gameState
  )

  return (
    <View className="bg-white p-4 shadow-sm">
      <View className="flex justify-between items-center">
        <View>
          <Text className="text-xl font-bold">快艇骰子</Text>
          <Text className="text-gray-500">第 {currentRound} 回合</Text>
        </View>
        
        <View className="flex items-center">
          <View className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Text className="text-blue-600 font-bold">{rollsRemaining}</Text>
          </View>
          <Text className="ml-2">剩余次数</Text>
        </View>
      </View>
    </View>
  )
}

export default GameHeader
