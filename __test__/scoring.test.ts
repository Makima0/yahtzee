import { calculateScore } from '../src/utils/scoring'
import { DiceFace } from '../src/types/types'

describe('scoring utils', () => {
  describe('calculateScore', () => {
    it('应该正确计算 Ones', () => {
      const dices: DiceFace[] = [1, 1, 2, 3, 4]
      expect(calculateScore('Ones', dices)).toBe(2)
    })

    it('应该正确计算 FullHouse', () => {
      const dices: DiceFace[] = [2, 2, 2, 3, 3]
      expect(calculateScore('FullHouse', dices)).toBe(25)
    })

    it('应该正确计算 Yacht', () => {
      const dices: DiceFace[] = [6, 6, 6, 6, 6]
      expect(calculateScore('Yacht', dices)).toBe(50)
    })
  })
})