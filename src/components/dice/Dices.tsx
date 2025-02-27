// types/dice.ts
export type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

// components/3dDice.tsx
import {useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

interface DiceProps {
  result: DiceFace;
  onRollStart?: () => void;
  onRollEnd?: () => void;
}

export interface DiceRef {
  roll: () => Promise<void>;
}

const Dice = forwardRef<DiceRef, DiceProps>(({ result, onRollStart, onRollEnd }, ref) => {
  const animationRef = useRef<Taro.Animation | null>(null);
  const [displayFace, setDisplayFace] = useState<DiceFace>(1);
  const isRolling = useRef(false);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    roll: async () => {
      if (isRolling.current) return;
      return new Promise((resolve) => {
        startAnimation().then(resolve);
      });
    }
  }));

  // 3D 旋转参数生成
  const getRandomRotation = () => {
    const base = 360 * 2 + Math.random() * 360;
    return {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random() * 10,
      deg: base + (result - 1) * 90 // 根据结果计算最终角度
    };
  };

  // 骰子面配置
  const faceConfig: Record<DiceFace, { rotation: string; positions: number[] }> = {
    1: { rotation: 'rotateX(0deg) rotateY(0deg)', positions: [0, 0, 50] },
    2: { rotation: 'rotateX(-90deg) rotateY(0deg)', positions: [0, -50, 0] },
    3: { rotation: 'rotateY(-90deg) rotateX(0deg)', positions: [50, 0, 0] },
    4: { rotation: 'rotateY(90deg) rotateX(0deg)', positions: [-50, 0, 0] },
    5: { rotation: 'rotateX(90deg) rotateY(0deg)', positions: [0, 50, 0] },
    6: { rotation: 'rotateY(180deg) rotateX(0deg)', positions: [0, 0, -50] }
  };

  const startAnimation = async () => {
    isRolling.current = true;
    onRollStart?.();
    
    const { x, y, z, deg } = getRandomRotation();
    const animation = Taro.createAnimation({
      duration: 1500,
      timingFunction: 'ease-in-out',
      transformOrigin: '50% 50%'
    });

    // 第一阶段：快速旋转
    animation
      .rotate3d(x, y, z, deg)
      .scale(1.2)
      .step({ duration: 1200 });

    // 第二阶段：缓入定位
    animation
      .rotate3d(0, 0, 0, 0)
      .translate3d(...faceConfig[result].positions as [number, number, number])
      .scale(1)
      .step({ duration: 300, timingFunction: 'ease-out' });

    animationRef.current = animation;
    setDisplayFace(result);

    // 数字闪动效果
    const interval = setInterval(() => {
      setDisplayFace(prev => (prev % 6 + 1) as DiceFace);
    }, 150);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    clearInterval(interval);
    isRolling.current = false;
    onRollEnd?.();
  };

  return (
    <View 
      className="w-32 h-32 relative preserve-3d"
      animation={animationRef.current?.export()}
    >
      {/* 3D 骰子面 */}
      {Object.entries(faceConfig).map(([face, config]) => (
        <View
          key={face}
          className="absolute w-full h-full bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center"
          style={{
            transform: `${config.rotation} translate3d(${config.positions.join('px,')}px)`,
            backfaceVisibility: 'hidden'
          }}
        >
          <Text className="text-2xl font-bold">{face}</Text>
        </View>
      ))}

      {/* 当前显示数字（用于动画） */}
      <View className="absolute inset-0 flex items-center justify-center opacity-0">
        <Text className="text-4xl font-bold">{displayFace}</Text>
      </View>
    </View>
  );
})

export default Dice;

