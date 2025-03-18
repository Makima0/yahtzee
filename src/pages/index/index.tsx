import { FC } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ActionButton from '@/components/buttons/AuctionButton'
import RollingDiceLogo from '@/components/logo/RollingDiceLogo'

const HomePage: FC = () => {
  const handleStartGame = () => {
    Taro.navigateTo({
      url: '/pages/game/index'
    })
  }

  return (
    <View className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <View className="mb-8 text-center">
        <Text className="text-3xl font-bold text-blue-600 mb-2 block">快艇骰子</Text>
        <Text className="text-gray-500 text-lg">经典骰子游戏</Text>
      </View>

      <View className="w-full max-w-xs mb-12 flex justify-center">
        {/* 使用滚动骰子Logo */}
        <View className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <RollingDiceLogo size="large" />
        </View>
      </View>

      <View className="w-full max-w-xs space-y-4">
        <ActionButton 
          variant="primary" 
          onClick={handleStartGame}
          className="w-full"
        >
          开始游戏
        </ActionButton>
        
        <ActionButton 
          variant="secondary" 
          onClick={() => Taro.navigateTo({ url: '/pages/rules/index' })}
          className="w-full"
        >
          游戏规则
        </ActionButton>
      </View>
    </View>
  )
}

export default HomePage