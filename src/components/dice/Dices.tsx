// src/components/Dice3D.tsx
import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import { DiceFace } from '@/types/types'
import Taro from '@tarojs/taro'
import './dice.scss'
interface Props {
  value: DiceFace
  isLocked: boolean
  isRolling?: boolean
  onClick?: () => void
}

const Dice3D: FC<Props> = ({ value, isLocked, isRolling = false, onClick }) => {
  // 处理点击
  const handleClick = () => {
    if (onClick && !isRolling) {
      onClick()
      Taro.vibrateShort()
    }
  }

  return (
    <View className="dice-3d-container" onClick={handleClick}>
      <View 
        className={`dice-3d ${isLocked ? 'locked' : ''} 
                            ${isRolling ? 'rolling' : ''} 
                            show-${value}`}
      >
        {/* 骰子的六个面 */}
        <View className="dice-3d-face dice-3d-front">
          <View className="dot center" />
        </View>
        <View className="dice-3d-face dice-3d-back">
          <View className="dot top-left" />
          <View className="dot top-right" />
          <View className="dot middle-left" />
          <View className="dot middle-right" />
          <View className="dot bottom-left" />
          <View className="dot bottom-right" />
        </View>
        <View className="dice-3d-face dice-3d-right">
          <View className="dot top-left" />
          <View className="dot top-right" />
          <View className="dot center" />
          <View className="dot bottom-left" />
          <View className="dot bottom-right" />
        </View>
        <View className="dice-3d-face dice-3d-left">
          <View className="dot top-left" />
          <View className="dot top-right" />
          <View className="dot bottom-left" />
          <View className="dot bottom-right" />
        </View>
        <View className="dice-3d-face dice-3d-top">
          <View className="dot top-left" />
          <View className="dot center" />
          <View className="dot bottom-right" />
        </View>
        <View className="dice-3d-face dice-3d-bottom">
          <View className="dot top-left" />
          <View className="dot bottom-right" />
        </View>
        
        {/* 锁定指示器 */}
        {isLocked && (
          <View className="dice-lock-indicator">
            <View className="lock-icon" />
          </View>
        )}
      </View>
    </View>
  )
}

export default memo(Dice3D)
