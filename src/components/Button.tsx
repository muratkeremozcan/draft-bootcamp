import { ButtonHTMLAttributes } from 'react'
import styled from '@emotion/styled'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const BaseButton = styled.button({
  border: 'none',
  backgroundColor: '#03c',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
  lineHeight: '40px',
  padding: '0 8px',
})

export default function Button({children, ...props}: Props) {
  return (
    <BaseButton className="button" {...props}>
      {children}
    </BaseButton>
  )
}
