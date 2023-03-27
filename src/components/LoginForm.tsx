import {useState} from 'react'
import type {ChangeEvent, FormEvent} from 'react'
import Logo from './Logo'
import Input from './Input'
import PasswordInput from './PasswordInput'
import Button from './Button'

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    let message
    const hasNonEmptyEmail = Boolean(email)
    const hasNonEmptyPassword = Boolean(password)

    if (hasNonEmptyEmail && hasNonEmptyPassword) {
      message = 'Login submitted successfully!'
    } else if (!hasNonEmptyEmail) {
      message = 'Please enter a non-empty email'
    } else {
      message = 'Please enter a non-empty password'
    }
    alert(message)
  }

  return (
    <form data-cy="LoginForm" className="login-form" onSubmit={handleSubmit}>
      <Logo />
      <Input
        id="email"
        label="Email Address"
        name="email"
        onChange={handleChangeEmail}
        value={email}
      />
      <PasswordInput
        id="passwordToggle"
        label="Password"
        onChange={handleChangePassword}
        value={password}
      />
      <Button type="submit">Log in</Button>
    </form>
  )
}
