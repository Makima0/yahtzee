// src/components/ScoreCard.tsx
import { FC, memo } from "react";
import { View, Text, Button } from "@tarojs/components";
import { ScoreCategory } from "../../types/types";

interface Props {
  category: ScoreCategory;
  score: number | null;
  previewScore?: number | null;
  isActive?: boolean;
  onClick: () => void;
}

const ScoreCard: FC<Props> = ({
  category,
  score,
  previewScore = null,
  isActive = false,
  onClick,
}) => {
  // 分类中文名称映射
  const categoryLabels: Record<ScoreCategory, string> = {
    // 基础分类
    Ones: "一点",
    Twos: "二点",
    Threes: "三点",
    Fours: "四点",
    Fives: "五点",
    Sixes: "六点",
    // 组合分类
    FullHouse: "葫芦",
    FourOfAKind: "四骰同花",
    LittleStraight: "小顺子",
    BigStraight: "大顺子",
    Choice: "自由选择",
    Yacht: "快艇",
  };

  // 规则描述
  const ruleDescriptions: Record<ScoreCategory, string> = {
    // 基础分类
    Ones: "所有1点的总和",
    Twos: "所有2点的总和",
    Threes: "所有3点的总和",
    Fours: "所有4点的总和",
    Fives: "所有5点的总和",
    Sixes: "所有6点的总和",
    // 组合分类
    FullHouse: "三同+二同 (总点数)",
    FourOfAKind: "四个相同点数 (总点数)",
    LittleStraight: "1-2-3-4-5 (30分)",
    BigStraight: "2-3-4-5-6 (30分)",
    Choice: "所有骰子点数总和",
    Yacht: "五个相同点数 (50分)",
  };

  return (
    <View
      className={`p-3 mb-2 rounded-lg border 
      ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}
      ${score !== null ? "bg-gray-50" : ""}`}
    >
      <View className="flex justify-between items-center">
        <View>
          <Text className="text-lg font-medium">
            {categoryLabels[category]}
          </Text>
          <Text className="text-gray-500 text-xs block">
            {ruleDescriptions[category]}
          </Text>
        </View>

        <View className="flex items-center">
          {score !== null ? (
            // 已记录的分数
            <Text className="text-xl font-bold mr-4">{score}</Text>
          ) : (
            <>
              {/* 预览分数显示 */}
              {previewScore !== null && (
                <View className="flex flex-col items-end mr-3">
                  <Text className="text-gray-500 text-xs">可得</Text>
                  <Text
                    className={`text-lg font-medium 
                    ${previewScore > 0 ? "text-green-500" : "text-gray-500"}`}
                  >
                    {previewScore}
                  </Text>
                </View>
              )}

              {/* 选择按钮 */}
              <Button
                className={`px-4 py-1 rounded-full text-sm
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                onClick={onClick}
                disabled={!isActive}
              >
                {isActive ? "确认选择" : "选择"}
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(ScoreCard);
