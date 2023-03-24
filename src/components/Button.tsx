import type {ButtonHTMLAttributes} from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({children, ...props}: Props) {
  return (
    <button data-cy="Button" className="button" {...props}>
      {children}
    </button>
  )
}
