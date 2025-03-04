// src/components/ActionButton.tsx
import { FC, ReactNode } from 'react'
import { Button } from '@tarojs/components'

interface Props {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  className?: string
}

const ActionButton: FC<Props> = ({ 
  children,
  onClick,
  variant = 'primary',
  disabled,
  className
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }

  return (
    <Button
      className={`px-6 py-3 rounded-lg font-medium transition-colors
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default ActionButton
