import type {HTMLProps} from 'react'

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input className="form-input" type="text" id={id} {...restProps}></input>
    </div>
  )
}
