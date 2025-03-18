import { FC, useEffect, useState, useRef } from 'react'
import { View } from '@tarojs/components'
import Dice3D from '@/components/dice/Dices'
import { DiceFace } from '@/types/types'
import './logo.scss'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

const RollingDiceLogo: FC<Props> = ({ size = 'medium' }) => {
  const [diceValue, setDiceValue] = useState<DiceFace>(1)
  const [isRolling, setIsRolling] = useState(true)
  const animationTimerRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // 使用 requestAnimationFrame 替代 setTimeout
  const startRolling = () => {
    setIsRolling(true)
    
    // 使用 requestAnimationFrame 控制动画时间
    let startTime: number | null = null
    const duration = 600 // 动画持续时间
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      
      if (elapsed < duration) {
        animationTimerRef.current = requestAnimationFrame(animate)
      } else {
        // 动画结束，设置新值
        const newValue = (Math.floor(Math.random() * 6) + 1) as DiceFace
        setDiceValue(newValue)
        setIsRolling(false)
      }
    }
    
    animationTimerRef.current = requestAnimationFrame(animate)
  }
  
  useEffect(() => {
    // 初始滚动
    startRolling()

    intervalRef.current = setInterval(() => {
      startRolling()
    }, 3000)
    
    // 清理函数
    return () => {
      if (animationTimerRef.current) {
        cancelAnimationFrame(animationTimerRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
  
  return (
    <View className={`rolling-dice-logo ${size}`}>
      <Dice3D
        value={diceValue}
        isLocked={false}
        isRolling={isRolling}
        disableInteraction={true}
      />
    </View>
  )
}

export default RollingDiceLogo