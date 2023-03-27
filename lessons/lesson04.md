## Overview

In this assignment, we will be doing some refactoring, where we’ll be converting our stylesheet rules into object notation, declared to its respective component.  

## A general rule for converting CSS selectors to JS Notation

- Convert the property value into camelcase in order to assign it as a valid JS-object property label.
- CSS property values can now be declared into type primitives! While most properties may have to be defined as strings, pixel-based properties can be defined as a number type.

The line height style attribute when defined as a unitless, will be evaluated by multiplying it’s provided value with its own font size https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#values). In other words, declaring our property as: lineHeight: 1.5 in JS-object notation will be evaluated as 1.5 * the element’s font-size, and not 1.5 pixels, making that vertical spacing significantly taller than its pixel counterpart! 

While we can also opt for declaring our property with a specified unit , i.e. lineHeight: "24px", the general recommendation is to opt for a unitless value, make sure to inspect your design wireframes for line-height or vertical height attributes, and adjust the values accordingly.  

- To nest pseudo-classes like:hover, :visited, and::before , wrap the target class in quotation, with its respective CSS properties encapsulated as a nested object in the parent object.

```
button = styled.button({
  backgroundColor: '#000ebd',
  '&:hover': {
    backgroundColor: '#000eef'
  }
}) 
```

## Converting the input stylesheet rules to JS-in-CSS

Let’s start by converting the form input group CSS into styled-components. Currently it is:

```
.form-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}

.form-group > label {
    display: block;
    color: #090637;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 6px;
    width: 100%;
}

.form-input {
    border: 1px solid #515963;
    border-radius: 4px;
    font-family: "Nunito Sans", sans-serif;
    line-height: 38px;
    padding: 0 8px;
    flex: 1 0;
}

.form-input:focus {
    box-shadow: #27aee4 0px 0px 0px 1px inset;
    border: 1px solid #27aee4;
    outline: none;
}
```

which converts to:

```
const FormGroup = styled.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  width: '100%'
})

const Label = styled.label({
  display: 'block',
  color: '#090637',
  fontSize: '14px',
  fontWeight: 600,
  paddingBottom: '6px',
  width: '100%',
})

const FormInput = styled.input({
  border: '1px solid #515963',
  borderRadius: '4px',
  fontFamily: '"Nunito Sans", sans-serif',
  lineHeight: '38px',
  padding: '0 8px',
  flex: '1 0',
  '&:focus': {
    boxShadow: '#27aee4 0px 0px 0px 1px inset',
    border: '1px solid #27aee4',
    outline: 'none'
  }
})
```

You’ll then place these new declarations under the component declaration in the appropriate file. So for Input.tsx it will look like this (be sure to import the styled component):

```
import {HTMLProps} from 'react'
import styled from '@emotion/styled'

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input className="form-input" type="text" id={id} {...restProps} />
    </div>
  )
}

const FormGroup = styled.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  width: '100%'
})

const Label = styled.label({
  display: 'block',
  color: '#090637',
  fontSize: '14px',
  fontWeight: 600,
  paddingBottom: '6px',
  width: '100%',
})

const FormInput = styled.input({
  border: '1px solid #515963',
  borderRadius: '4px',
  fontFamily: '"Nunito Sans", sans-serif',
  lineHeight: '38px',
  padding: '0 8px',
  flex: '1 0',
  '&:focus': {
    boxShadow: '#27aee4 0px 0px 0px 1px inset',
    border: '1px solid #27aee4',
    outline: 'none'
  }
})
```

Finally we’ll need to replace the usage of the CSS class names in our JSX with the corresponding styled component. Our Input.tsx will go from this:

```
<div className="form-group">
  <label className="form-label"></label>
  <input className="form-input" />
</div>
```

to this:

```
<FormGroup>
  <Label></Label>
  <FormInput/>
</FormGroup>
```

Repeat this process for all our CSS classes and corresponding components.

```
import type {HTMLProps} from 'react'
import styled from '@emotion/styled'
import type {StyledComponent} from '@emotion/styled'

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    <FormGroup data-cy="Input">
      <Label htmlFor={id}>{label}</Label>
      <FormInput
        data-cy="form-input"
        type="text"
        id={id}
        {...restProps}
      ></FormInput>
    </FormGroup>
  )
}

const FormGroup = styled.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  width: '100%',
})

const Label = styled.label({
  display: 'block',
  color: '#090637',
  fontSize: '14px',
  fontWeight: 600,
  paddingBottom: '6px',
  width: '100%',
})

const FormInput: StyledComponent<
  HTMLProps<HTMLInputElement>,
  any,
  Record<string, never>
> = styled.input({
  border: '1px solid #515963',
  borderRadius: '4px',
  fontFamily: '"Nunito Sans", sans-serif',
  lineHeight: '38px',
  padding: '0 8px',
  flex: '1 0',
  '&:focus': {
    boxShadow: '#27aee4 0px 0px 0px 1px inset',
    border: '1px solid #27aee4',
    outline: 'none',
  },
})
```



```
import styled from '@emotion/styled'

export default function Footer() {
  return (
    <Wrapper data-cy="Footer">
      Don't have an account yet?&nbsp;
      <ExternalLink href="https://www.extend.com/contact">
        Contact us
      </ExternalLink>
    </Wrapper>
  )
}

const Wrapper = styled.footer({
  marginTop: 16,
  textAlign: 'center',
})

const ExternalLink = styled.a({
  textDecoration: 'inherit',
  color: '#03c',
})
```



```
import styled from '@emotion/styled'
import type {ButtonHTMLAttributes} from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function
src/components/LoginForm.tsx
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


 Button({children, ...props}: Props) {
  return (
    <BaseButton data-cy="Button" {...props}>
      {children}
    </BaseButton>
  )
}

const BaseButton = styled.button({
  border: 'none',
  backgroundColor: '#03c',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600' as 'bold',
  lineHeight: '40px',
  padding: '0 8px',
})
```



```
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
```



```
import {useState} from 'react'
import Input from './Input'
import type {Props as InputProps} from './Input'
import Button from './Button'
import styled from '@emotion/styled'

type Props = InputProps

export default function PasswordInput({label, ...restProps}: Props) {
  const [inputType, setInputType] = useState<'password' | 'text'>('password')

  const toggleInputType = () => {
    const newInputType = inputType === 'password' ? 'text' : 'password'
    setInputType(newInputType)
  }

  return (
    <Wrapper data-cy="PasswordInput" className="password-form-input">
      <Input type={inputType} label={label} {...restProps} />
      <Button type="button" id="passwordToggle" onClick={toggleInputType}>
        {inputType === 'password' ? 'Show' : 'Hide'}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 8,
})
```



## App

We are going to have to do something special with our App.tsx. We need to set some global styles that apply to the whole application. To do that we use a Global component and set the styles like this:

```
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import {Global, css} from '@emotion/react'

export default function App() {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }

          body {
            background-color: #f3f6f9;
            font-family: 'Nunito Sans', sans-serif;
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      />
      <LoginForm />
      <Footer />
    </>
  )
}
```

When you are done, remove the file src/styles.css from your project.

Check your browser and the form should look like it did before:

## Test

The changes for testing are generally about not using css selectors, and sometimes utilizing data-cy attributes.

Remove the styles.css import from ./cypress/support/component.tsx

```
// put CT-only commands here
import './commands'

import {mount} from 'cypress/react18'

Cypress.Commands.add('mount', mount)
```



There is only one component that needs a tweak; src/components/PasswordInput.cy.tsx .

Can you replace the css selector that is breaking the test with a data-cy attribute selector? (Hint: the attribute can be added to the Input component)

```
import PasswordInput from './PasswordInput'

describe('PasswordInput', () => {
  it('should render children: Input and Button', () => {
    cy.mount(<PasswordInput label="foo" />)

    cy.getByCy('Input').should('be.visible')
    cy.getByCy('Button').should('be.visible')

    cy.getByCy('form-input')
      .should('have.attr', 'type', 'password')
      .type('bar', {delay: 0})

    cy.getByCy('Button').contains('Show').click()
    cy.getByCy('form-input').should('have.attr', 'type', 'text')

    cy.getByCy('Button').contains('Hide').click()
    cy.getByCy('form-input').should('have.attr', 'type', 'password')
  })
})
```



## Summary

Your takeaways from this assignment should be:

-  Declaring CSS style selectors in CSS-in-JS notation. 
- Using data-cy attributes in tests
  - Let’s automate! For hints on converting CSS stylesheets to styled-components object-notation syntax, Check out https://transform.tools/css-to-js 
