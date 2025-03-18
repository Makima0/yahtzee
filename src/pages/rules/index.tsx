import { FC } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ActionButton from '@/components/buttons/AuctionButton'

const RulesPage: FC = () => {
  return (
    <View className="min-h-screen bg-gray-50 p-4">
      <ScrollView scrollY className="h-full">
        <View className="bg-white rounded-lg shadow p-4 mb-4">
          <Text className="text-xl font-bold mb-2 block">游戏规则</Text>
          <Text className="text-gray-700 leading-relaxed">
            快艇骰子是一种流行的骰子游戏，玩家通过掷骰子并根据不同的组合获得分数。
          </Text>
        </View>

        <View className="bg-white rounded-lg shadow p-4 mb-4">
          <Text className="text-lg font-bold mb-2 block">游戏流程</Text>
          <Text className="text-gray-700 mb-2 block">1. 每回合有3次掷骰机会</Text>
          <Text className="text-gray-700 mb-2 block">2. 每次掷骰后可以锁定想要保留的骰子</Text>
          <Text className="text-gray-700 mb-2 block">3. 选择一个分类记录分数</Text>
          <Text className="text-gray-700 mb-2 block">4. 游戏共12回合，每个分类只能使用一次</Text>
        </View>

        <View className="bg-white rounded-lg shadow p-4 mb-4">
          <Text className="text-lg font-bold mb-2 block">计分规则</Text>
          <Text className="text-gray-700 mb-1 block">• 一点至六点：对应点数的总和</Text>
          <Text className="text-gray-700 mb-1 block">• 葫芦（三带二）：25分</Text>
          <Text className="text-gray-700 mb-1 block">• 四骰相同：所有骰子总和</Text>
          <Text className="text-gray-700 mb-1 block">• 小顺子（四个连续）：30分</Text>
          <Text className="text-gray-700 mb-1 block">• 大顺子（五个连续）：40分</Text>
          <Text className="text-gray-700 mb-1 block">• 快艇（五个相同）：50分</Text>
          <Text className="text-gray-700 mb-1 block">• 全选：所有骰子总和</Text>
        </View>

        <View className="bg-white rounded-lg shadow p-4 mb-8">
          <Text className="text-lg font-bold mb-2 block">奖励规则</Text>
          <Text className="text-gray-700">
            如果基础分类（一点至六点）的总分达到63分或以上，将获得额外35分奖励。
          </Text>
        </View>

        <ActionButton 
          variant="primary" 
          onClick={() => Taro.navigateBack()}
          className="w-full mb-6"
        >
          返回
        </ActionButton>
      </ScrollView>
    </View>
  )
}

export default RulesPage