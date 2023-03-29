import Logo from './Logo'
import Input from './Input'
import PasswordInput from './PasswordInput'
import Button from './Button'
import styled from '@emotion/styled'
import {useFormik} from 'formik'
import * as yup from 'yup'

export default function LoginForm() {
  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert('submitting')
    },
    validationSchema: validationSchema,
  })

  const hasEmailErrors = Boolean(formik.errors.email)
  const hasPasswordErrors = Boolean(formik.errors.password)
  const hasFormErrors = hasEmailErrors || hasPasswordErrors

  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <Logo />
      <Input
        id="email"
        label="Email Address"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {hasEmailErrors && <ErrorMessage>{formik.errors.email}</ErrorMessage>}
      <PasswordInput
        id="passwordToggle"
        label="Password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {hasPasswordErrors && (
        <ErrorMessage>{formik.errors.password}</ErrorMessage>
      )}
      <Button type="submit" disabled={hasFormErrors}>
        Log in
      </Button>
    </FormWrapper>
  )
}

const FormWrapper = styled.form({
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
