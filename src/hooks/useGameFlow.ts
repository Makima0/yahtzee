// src/hooks/useGameFlow.ts

import { useState, useCallback, useMemo } from 'react'
import { useGameStore } from '@/store/gameStore'
import { ScoreCategory } from '@/types/types'
import { calculateScore } from '@/utils/scoring'
import Taro from '@tarojs/taro'
import { BASIC_CATEGORIES } from '@/constants/gameCategories'

/**
 * 游戏流程控制Hook，管理快艇骰子游戏的核心逻辑
 * 
 * @description 
 * 这个自定义Hook封装了快艇骰子游戏的全部游戏逻辑，包括：
 * - 骰子的投掷和锁定
 * - 分数计算和记录
 * - 奖励分数判定
 * - 游戏状态管理
 * - 动画效果控制
 * @returns {Object} 游戏流程控制对象
 */

export const useGameFlow = () => {
 /** 获得奖励分数的基础分阈值 */
 const BONUS_THRESHOLD = 63
 /** 奖励分数数额 */
 const BONUS_AMOUNT = 35
 
 /** 
  * 从全局状态获取游戏状态和操作方法
  */
 const {
   gameState,
   rollDices,
   toggleLock,
   recordScore,
   resetGame
 } = useGameStore()
 

 const [isRolling, setIsRolling] = useState(false)


 const handleRollDice = useCallback(() => {
   if (gameState.rollsRemaining > 0 && !isRolling) {
     setIsRolling(true)
     
     // 使用 requestAnimationFrame 替代 setTimeout
     let startTime: number | null = null
     const duration = 600 // 动画持续时间
     
     const animate = (timestamp: number) => {
       if (!startTime) startTime = timestamp
       const elapsed = timestamp - startTime
       
       if (elapsed < duration) {
         requestAnimationFrame(animate)
       } else {
         // 动画结束，更新状态
         rollDices()
         setIsRolling(false)
       }
     }
     
     requestAnimationFrame(animate)
   }
 }, [gameState.rollsRemaining, rollDices, isRolling])


 const handleLockDice = useCallback((index: number) => {
   if (!isRolling && gameState.rollsRemaining < 3) {
     toggleLock(index)
     Taro.vibrateShort() // 提供振动反馈
   }
 }, [toggleLock, isRolling, gameState.rollsRemaining])


 const previewScores = useMemo(() => {
   if (gameState.rollsRemaining === 3) return {}

   const currentDiceValues = gameState.dices.map(d => d.value)
   const result: Partial<Record<ScoreCategory, number>> = {}

   Object.entries(gameState.scores).forEach(([category, score]) => {
     if (score === null) {
       const categoryKey = category as ScoreCategory
       result[categoryKey] = calculateScore(categoryKey, currentDiceValues)
     }
   })

   return result
 }, [gameState.dices, gameState.rollsRemaining, gameState.scores])


 const handleScoreSelection = useCallback((category: ScoreCategory) => {
   if (gameState.scores[category] !== null) return

   const currentDiceValues = gameState.dices.map(d => d.value)
   const score = calculateScore(category, currentDiceValues)
   
   recordScore(category, score)
 }, [gameState.dices, gameState.scores, recordScore])

 const basicScoresTotal = useMemo(() => {
   return BASIC_CATEGORIES.reduce((total, category) => {
     return total + (gameState.scores[category] || 0)
   }, 0)
 }, [gameState.scores])

 const bonusEarned = basicScoresTotal >= BONUS_THRESHOLD

 const totalScore = useMemo(() => {
   const allScoresSum = Object.values(gameState.scores).reduce(
     (total, score) => total===null?0:total + (score || 0), 0
   )
   return allScoresSum===null?0:allScoresSum + (bonusEarned ? BONUS_AMOUNT : 0)
 }, [gameState.scores, bonusEarned, BONUS_AMOUNT])


 const isGameEnded = Object.values(gameState.scores).every(
   score => score !== null
 )


 const handleResetGame = useCallback(() => {
   Taro.showModal({
     title: '重新开始游戏',
     content: '确定要重置当前游戏进度吗？',
     success: (res) => {
       if (res.confirm) resetGame()
     }
   })
 }, [resetGame])

 /**
  * 返回游戏流程控制对象
  * 包含游戏状态、计算值和处理函数
  */
 return {
   /** 当前游戏状态 */
   gameState,
   
   /** 骰子是否正在滚动动画中 */
   isRolling,
   
   /** 每个未记分项目的预览分数 */
   previewScores,
   
   /** 基础得分项总和 */
   basicScoresTotal,
   
   /** 是否达成基础分奖励 */
   bonusEarned,
   
   /** 当前总分 */
   totalScore,
   
   /** 游戏是否结束 */
   isGameEnded,
   
   /** 奖励分数数额 */
   BONUS_AMOUNT,
   
   /** 投掷骰子处理函数 */
   handleRollDice,
   
   /** 锁定/解锁骰子处理函数 */
   handleLockDice,
   
   /** 选择计分类别处理函数 */
   handleScoreSelection,
   
   /** 重置游戏确认处理函数 */
   handleResetGame,
   
   /** 直接重置游戏函数 */
   resetGame
 }
}
