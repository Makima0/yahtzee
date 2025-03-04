// src/components/game/DiceSection.tsx
import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import { DiceState } from '@/types/types'
import Dice3D from '@/components/dice/Dices'

interface Props {
  dices: DiceState[]
  isRolling: boolean
  onLockToggle: (index: number) => void
}

const DiceSection: FC<Props> = ({ dices, isRolling, onLockToggle }) => {
  return (
    <View className="bg-white py-4 shadow-sm">
      <View className="dice-container flex justify-around p-4">
        {dices.map((dice, index) => (
          <Dice3D
            key={index}
            value={dice.value}
            isLocked={dice.isLocked}
            isRolling={isRolling && !dice.isLocked}
            onClick={() => {
              console.log(dices);
              
              onLockToggle(index)}}
          />
        ))}
      </View>
      
      <View className="px-4 flex justify-between items-center">
        <Text className="text-gray-500 text-sm">
          点击骰子锁定/解锁
        </Text>
      </View>
    </View>
  )
}

export default memo(DiceSection)
