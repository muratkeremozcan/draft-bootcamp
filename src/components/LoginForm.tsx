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

  const {values, errors, handleSubmit, handleChange, handleBlur, touched} =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: () => {
        alert('submitting')
      },
      validateOnChange: false,
      validationSchema: validationSchema,
    })

  const hasEmailErrors = Boolean(errors.email) && touched.email
  const hasPasswordErrors = Boolean(errors.password) && touched.password

  return (
    <Form data-cy="LoginForm" onSubmit={handleSubmit}>
      <Logo />
      <Input
        id="email"
        label="Email Address"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {hasEmailErrors && <ErrorMessage>{errors.email}</ErrorMessage>}
      <PasswordInput
        id="passwordToggle"
        label="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {hasPasswordErrors && <ErrorMessage>{errors.password}</ErrorMessage>}
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

const ErrorMessage = styled.div({
  backgroundColor: '#ff0000',
  padding: 10,
})

/*

In order to prevent the UI for validation from being too persistent or visually jarring
we should prefer to have fields validate either on blur or on form submit and remove validation on change. 

Also in the case of the login page by setting hasEmailErrors and hasPasswordErrors 
based on the presence of an error as well as each field individually having been touched 
we make sure the error message only appears on fields that have been interacted with or upon form submission.

This kind of validation interaction requires the submit button to always be enabled, 
so we should not be preventing the submit button from being clicked (disabled) 
when there are or are possibly errors present. 

This can be a better experience especially on longer forms when a user inadvertently skips a required field.
Rather than having the submit button disabled leaving the user in the dark about why they cannot submit the form, 
submit can be clicked causing any untouched required fields to be validated thus showing the appropriate error messages.

*/
