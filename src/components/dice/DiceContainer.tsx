// src/components/DiceContainer.tsx
import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import { DiceState } from '@/types/types'

interface Props {
  dices: DiceState[],
  onLockToggle: (index: number) => void
}

const DiceContainer: FC<Props> = ({ dices, onLockToggle }) => {
  return (
    <View className="flex justify-between my-6 px-4">
      {dices.map((dice, index) => (
        <View
          key={index}
          className={`w-16 h-16 rounded-lg flex items-center justify-center
            shadow-lg transition-all duration-300
            ${dice.isLocked 
              ? 'bg-blue-500 scale-110' 
              : 'bg-white hover:bg-gray-50'}
            ${dice.isLocked ? 'ring-4 ring-blue-300' : ''}`}
          onClick={() => onLockToggle(index)}
        >
          <Text className={`text-3xl font-bold 
            ${dice.isLocked ? 'text-white' : 'text-gray-800'}`}>
            {dice.value}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default memo(DiceContainer)
