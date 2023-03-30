import Logo from './Logo'
import Input from './Input'
import PasswordInput from './PasswordInput'
import Button from './Button'
import styled from '@emotion/styled'
import {Formik} from 'formik'
import * as yup from 'yup'

export default function LoginForm() {
  const handleSubmit = (values: {email: string; password: string}): void => {
    alert('submitting')
  }

  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
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
        const hasFormErrors = Boolean(Object.values(errors).length)

        return (
          <FormWrapper>
            <Logo />
            <Input id="email" label="Email Address" name="email" />
            <PasswordInput
              id="passwordToggle"
              label="Password"
              name="password"
            />
            {hasFormErrors && (
              <ErrorMessage>
                Fill out all required fields to continue.
              </ErrorMessage>
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

const Form = styled.form({
  backgroundColor: '#fff',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  padding: 40,
  width: 440,
})

// replace the native form element in the styled component with Formik's Form
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
