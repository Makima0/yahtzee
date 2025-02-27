// src/utils/scoring.ts
import { DiceFace, ScoreCategory } from '@/types/types'

/**
 * 根据当前骰子状态计算指定分类的得分
 * @param category 计分分类
 * @param dices 骰子数组（已排序）
 * @returns 计算得分
 */
export const calculateScore = (
  category: ScoreCategory,
  dices: DiceFace[]
): number => {
  // 先对骰子进行排序方便计算
  const sorted = [...dices].sort((a, b) => a - b)
  const counts = getCounts(sorted)

  switch (category) {
    // 基础得分项（1-6点）
    case 'Ones': return sumDices(sorted, 1)
    case 'Twos': return sumDices(sorted, 2)
    case 'Threes': return sumDices(sorted, 3)
    case 'Fours': return sumDices(sorted, 4)
    case 'Fives': return sumDices(sorted, 5)
    case 'Sixes': return sumDices(sorted, 6)

    // 组合得分项
    case 'FullHouse': return checkFullHouse(counts) ? 25 : 0
    case 'FourOfAKind': return checkFourOfAKind(sorted, counts)
    case 'LittleStraight': return checkLittleStraight(sorted) ? 30 : 0
    case 'BigStraight': return checkBigStraight(sorted) ? 40 : 0
    case 'Choice': return sumDices(sorted)
    case 'Yacht': return checkYacht(counts) ? 50 : 0
    
    default:
      const _exhaustiveCheck: never = category
      return _exhaustiveCheck
  }
}

/* ========== 工具函数 ========== */

/**
 * 统计骰子出现次数
 * @param dices 已排序骰子数组
 * @returns 各点数出现次数数组（索引0对应1点）
 */
const getCounts = (dices: DiceFace[]): number[] => {
  return Array.from({ length: 6 }, (_, i) => 
    dices.filter(d => d === (i + 1)).length
  )
}

/**
 * 计算指定点数的骰子总和
 * @param dices 骰子数组
 * @param target 目标点数（不传则计算全部）
 */
const sumDices = (dices: DiceFace[], target?: DiceFace): number => {
  return dices
    .filter(d => target === undefined || d === target)
    .reduce((sum, d) => sum + d, 0)
}

/* ========== 组合判断逻辑 ========== */

/** 检查满堂红（三带一对） */
const checkFullHouse = (counts: number[]): boolean => {
  const hasThree = counts.some(c => c === 3)
  const hasTwo = counts.some(c => c === 2)
  const allFive = counts.reduce((sum, c) => sum + c, 0) === 5
  return hasThree && hasTwo && allFive
}

/** 检查四骰相同（返回骰子总和） */
const checkFourOfAKind = (dices: DiceFace[], counts: number[]): number => {
  const hasFour = counts.some(c => c >= 4)
  return hasFour ? sumDices(dices) : 0
}

/** 检查小顺子（4个连续数字） */
const checkLittleStraight = (sorted: DiceFace[]): boolean => {
  // 去重后检查连续情况
  const unique = [...new Set(sorted)]
  return (
    isConsecutive(unique, 4) || // 标准小顺子
    (sorted[0] === 1 && sorted[4] === 5) // 特殊序列 [1,2,3,4,5]
  )
}

/** 检查大顺子（5个连续数字） */
const checkBigStraight = (sorted: DiceFace[]): boolean => {
  return isConsecutive(sorted, 5) || 
    (sorted[0] === 2 && sorted[4] === 6) // 特殊序列 [2,3,4,5,6]
}

/** 检查快艇（五个相同） */
const checkYacht = (counts: number[]): boolean => {
  return counts.some(c => c === 5)
}

/* ========== 通用工具 ========== */

/**
 * 检查数组中是否存在指定长度的连续数字
 * @param arr 已排序数组
 * @param requiredLength 需要满足的连续长度
 */
const isConsecutive = (arr: number[], requiredLength: number): boolean => {
  let currentLength = 1
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      currentLength++
      if (currentLength >= requiredLength) return true
    } else if (arr[i] !== arr[i - 1]) {
      currentLength = 1
    }
  }
  return false
}
