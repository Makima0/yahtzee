import { FC, memo } from 'react'
import { View, Text } from '@tarojs/components'
import ActionButton from '@/components/buttons/AuctionButton'

interface Props {
  totalScore: number
  bonusEarned: boolean
  bonusAmount: number
  onNewGame: () => void
}

const GameEndModal: FC<Props> = ({ 
  totalScore, 
  bonusEarned, 
  bonusAmount, 
  onNewGame 
}) => {
  return (
    <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <View className="bg-white p-6 rounded-lg max-w-80">
        <Text className="text-xl font-bold mb-4 block">游戏结束！</Text>
        <Text className="text-2xl text-blue-600 block text-center mb-2">
          总分: {totalScore}
        </Text>
        {bonusEarned && (
          <Text className="text-green-500 text-center mb-4">
            (包含基础分奖励 +{bonusAmount}分)
          </Text>
        )}
        <ActionButton
          variant="primary"
          onClick={onNewGame}
          className="w-full"
        >
          开始新游戏
        </ActionButton>
      </View>
    </View>
  )
}

export default memo(GameEndModal)
