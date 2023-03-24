import Logo from './Logo'
import Input from './Input'
import PasswordInput from './PasswordInput'
import Button from './Button'

export default function LoginForm() {
  return (
    <form className="login-form">
      <Logo />
      <Input id="email" label="Email Address" name="email" />
      <PasswordInput id="passwordToggle" label="Password" />
      <Button type="submit">Log in</Button>
    </form>
  )
}
