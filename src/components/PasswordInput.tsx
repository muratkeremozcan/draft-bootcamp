import Input from './Input'
import type {Props as InputProps} from './Input'
import Button from './Button'

type Props = InputProps

export default function PasswordInput({label, id}: Props) {
  return (
    <div data-cy="PasswordInput" className="password-form-input">
      <Input label={label} />
      <Button id={id}>Show</Button>
    </div>
  )
}
