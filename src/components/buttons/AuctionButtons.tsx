// src/components/game/ActionButtons.tsx
import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import ActionButton from '@/components/buttons/AuctionButton'

interface Props {
  onRoll: () => void
  onReset: () => void
  rollsRemaining: number
  isRolling: boolean
}

const ActionButtons: FC<Props> = ({ 
  onRoll, 
  onReset, 
  rollsRemaining, 
  isRolling 
}) => {
  return (
    <View className="p-4 flex gap-3">
      <ActionButton
        variant="primary"
        onClick={onRoll}
        disabled={rollsRemaining === 0 || isRolling}
        className="flex-1"
      >
        {isRolling ? '骰子滚动中...' : (
          rollsRemaining > 0 ? 
            `摇骰子 (${rollsRemaining}次)` : 
            '无法再摇骰子'
        )}
      </ActionButton>
      
      <ActionButton
        variant="secondary"
        onClick={onReset}
        className="flex-1"
      >
        重置游戏
      </ActionButton>
    </View>
  )
}

export default memo(ActionButtons)
