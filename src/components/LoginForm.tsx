import {useState} from 'react'
import type {ChangeEvent, FormEvent} from 'react'
import Logo from './Logo'
import Input from './Input'
import PasswordInput from './PasswordInput'
import Button from './Button'
import styled from '@emotion/styled'

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
    <Form data-cy="LoginForm" onSubmit={handleSubmit}>
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
    </Form>
  )
}

const Form = styled.form({
  backgroundColor: '#fff',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  padding: 40,
  width: 440,
})
