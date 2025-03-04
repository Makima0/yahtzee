/// src/components/game/GameHeader.tsx
import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'

interface Props {
  currentRound: number
  rollsRemaining: number
}

const GameHeader: FC<Props> = ({ currentRound, rollsRemaining }) => {
  return (
    <View className="bg-white p-4 shadow-sm">
      <View className="flex justify-between items-center">
        <View>
          <Text className="text-xl font-bold">快艇骰子</Text>
          <Text className="text-gray-500">第 {currentRound} 回合</Text>
        </View>
        
        <View className="flex items-center">
          <View className={`w-8 h-8 rounded-full flex items-center justify-center
            ${rollsRemaining > 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
            <Text className={`font-bold
              ${rollsRemaining > 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {rollsRemaining}
            </Text>
          </View>
          <Text className="ml-2">剩余次数</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(GameHeader)
