import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ScoreCard from '../src/components/score/ScoreCard'
import React from 'react'

describe('ScoreCard 组件', () => {
  it('应该正确渲染分数卡片', () => {
    const { getByText } = render(
      <ScoreCard
        category="Ones"
        score={null}
        previewScore={3}
        isActive={true}
        onClick={() => {}}
      />
    )

    expect(getByText('一点')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
  })

  it('点击时应该触发回调', () => {
    const mockClick = jest.fn()
    const { getByText } = render(
      <ScoreCard
        category="Ones"
        score={null}
        isActive={true}
        onClick={mockClick}
      />
    )

    fireEvent.click(getByText('选择'))
    expect(mockClick).toHaveBeenCalled()
  })
})