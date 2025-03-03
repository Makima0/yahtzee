import { FC, memo, useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { DiceState } from '@/types/types'
import Dice3D from './Dices'

interface Props {
  dices: DiceState[]
  onLockToggle: (index: number) => void
  isRolling?: boolean
}

const DiceContainer: FC<Props> = ({ 
  dices, 
  onLockToggle, 
  isRolling = false 
}) => {
  return (
    <View className="dice-container flex justify-around py-6 px-2">
      {dices.map((dice, index) => (
        <Dice3D
          key={index}
          value={dice.value}
          isLocked={dice.isLocked}
          isRolling={isRolling && !dice.isLocked}
          onClick={() => onLockToggle(index)}
        />
      ))}
    </View>
  )
}

export default memo(DiceContainer)

