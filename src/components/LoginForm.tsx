import Logo from './Logo'
import Input from './Input'
import PasswordInput from './PasswordInput'
import Button from './Button'
import styled from '@emotion/styled'
import {Formik, Form} from 'formik'
import * as yup from 'yup'

export default function LoginForm() {
  const handleSubmit = (values: {email: string; password: string}): void => {
    alert('submitting')
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({errors}) => {
        const hasEmailErrors = Boolean(errors.email)
        const hasPasswordErrors = Boolean(errors.password)
        const hasFormErrors = hasEmailErrors || hasPasswordErrors

        return (
          <FormWrapper>
            <Logo />
            <Input id="email" label="Email Address" name="email" />
            <PasswordInput
              id="passwordToggle"
              label="Password"
              name="password"
            />
            {hasEmailErrors && <ErrorMessage>{errors.email}</ErrorMessage>}
            {hasPasswordErrors && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
            <Button type="submit" disabled={hasFormErrors}>
              Log in
            </Button>
          </FormWrapper>
        )
      }}
    </Formik>
  )
}

const FormWrapper = styled(Form)({
  backgroundColor: '#fff',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  padding: 40,
  width: 440,
})

const ErrorMessage = styled.div({
  backgroundColor: '#ff0000',
  padding: 10,
})
