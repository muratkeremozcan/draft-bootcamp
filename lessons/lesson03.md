Overview

Now that we know how to define local state in React, let’s restore the
functional attributes that we’ve built in lesson 0, back in the login form

Declare a local state and an event listener to manage the form inputs

Add the component state and change handlers in the LoginForm component:

// ./src/components/LoginForm.tsx ​ import {useState} from 'react' import type
{ChangeEvent} from 'react' import Logo from './Logo' import Input from './Input'
import PasswordInput from './PasswordInput' import Button from './Button' ​
export default function LoginForm() {  const [email, setEmail] =
useState<string>('')  const [password, setPassword] = useState<string>('') ​
 const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {  
 setEmail(e.currentTarget.value) } ​  const handleChangePassword = (e:
ChangeEvent<HTMLInputElement>) => {    setPassword(e.currentTarget.value) } ​
 return (    <form data-cy="LoginForm" className="login-form">      <Logo />    
 <Input
        id="email"
        label="Email Address"
        name="email"
        onChange={handleChangeEmail}
        value={email}
      />      <PasswordInput
        id="passwordToggle"
        label="Password"
        onChange={handleChangePassword}
        value={password}
      />      <Button type="submit">Log in</Button>    </form> ) }

Declare a local state and an event listener to toggle the form password input

Let’s re-introduce the password toggle feature. Update the PasswordInput to hold
the state of our password form input, and add a click listener on the button
toggle:

// ./src/components/PasswordInput.tsx ​ import {useState} from 'react' import
Input from './Input' import type {Props as InputProps} from './Input' import
Button from './Button' ​ type Props = InputProps ​ export default function
PasswordInput({label, ...restProps}: Props) {  const [inputType, setInputType] =
useState<'password' | 'text'>('password') ​  const toggleInputType = () => {  
 const newInputType = inputType === 'password' ? 'text' : 'password'  
 setInputType(newInputType) } ​  return (  
 <div data-cy="PasswordInput" className="password-form-input">      <Input
type={inputType} label={label} {...restProps} />    
 <Button type="button" id="passwordToggle" onClick={toggleInputType}>      
{inputType === 'password' ? 'Show' : 'Hide'}      </Button>    </div> ) }

Add an event listener in the login form

Remember the form submission behavior that we wrote in Assignment 0: Client
Basics | Write JS ? In this section, we’ll be revisiting that JS snippet to
evaluate the state values, and to attach that event callback in the login form:

// ./src/components/LoginForm.tsx ​ import {useState} from 'react' import type
{ChangeEvent, FormEvent} from 'react' import Logo from './Logo' import Input
from './Input' import PasswordInput from './PasswordInput' import Button from
'./Button' ​ export default function LoginForm() {  const [email, setEmail] =
useState<string>('')  const [password, setPassword] = useState<string>('') ​
 const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {  
 setEmail(e.currentTarget.value) } ​  const handleChangePassword = (e:
ChangeEvent<HTMLInputElement>) => {    setPassword(e.currentTarget.value) } ​
 const handleSubmit = (e: FormEvent) => {    e.preventDefault() ​    let message
   const hasNonEmptyEmail = Boolean(email)    const hasNonEmptyPassword =
Boolean(password) ​    if (hasNonEmptyEmail && hasNonEmptyPassword) {    
 message = 'Login submitted successfully!'   } else if (!hasNonEmptyEmail) {    
 message = 'Please enter a non-empty email'   } else {      message = 'Please
enter a non-empty password'   }    alert(message) } ​  return (  
 <form data-cy="LoginForm" className="login-form" onSubmit={handleSubmit}>    
 <Logo />      <Input
        id="email"
        label="Email Address"
        name="email"
        onChange={handleChangeEmail}
        value={email}
      />      <PasswordInput
        id="passwordToggle"
        label="Password"
        onChange={handleChangePassword}
        value={password}
      />      <Button type="submit">Log in</Button>    </form> ) }

Go ahead and try it out in your browser. You should see that if you try to
submit the form without the fields being filled out then it will notify you.

Test

(Murat)

Summary

Applying local state in components

Setting state value through an event

Handling events in React elements

Now that you’ve completed the theory and assignment, let’s move on to Lesson 4:
CSS & Styles.

Test

We have more functionality in both the components. Let us enhance the tests to
cover them.

The below is where we left off PasswordInput.cy.tsx in the previous lesson.

// ./src/components/PasswordInput.cy.tsx import PasswordInput from
'./PasswordInput'

describe('PasswordInput', () => { it('should render children: Input and Button',
() => { cy.mount(<PasswordInput label="foo" />)

    cy.getByCy('Input').should('be.visible')
    cy.getByCy('Button').should('be.visible')

}) })

Can you enhance the the test so that:

We verify that the input field is of a certain type (hint: useState), and we
type some text into it

The button should still be showing “Show”, we click it

We verify that now the input field is of another type, and the button is showing
“Hide”

Finally, we check things in reverse order

// ./src/components/PasswordInput.cy.tsx import PasswordInput from
'./PasswordInput'

describe('PasswordInput', () => { it('should render children: Input and Button',
() => { cy.mount(<PasswordInput label="foo" />)

    cy.getByCy('Input').should('be.visible')
    cy.getByCy('Button').should('be.visible')

    cy.get('.form-input')
      .should('have.attr', 'type', 'password')
      .type('bar', {delay: 0})

    cy.getByCy('Button').contains('Show').click()
    cy.get('.form-input').should('have.attr', 'type', 'text')

    cy.getByCy('Button').contains('Hide').click()
    cy.get('.form-input').should('have.attr', 'type', 'password')

}) })

The below is where we left off LoginForm.cy.tsx in the previous lesson.

// ./src/components/LoginForm.cy.tsx import LoginForm from './LoginForm'

describe('LoginForm', () => { it('should render the elements', () => {
cy.mount(<LoginForm />)

    cy.get('img').should('be.visible')
    cy.contains('#passwordToggle', 'Show').should('be.visible')

}) })

Can you enhance the the test so that:

We Spy on the window alert and alias it (hint)

We check empty email case, verify the spied alert call

We do the same for empty password case

With Both fields filled, we spy on the success alert

// ./src/components/LoginForm.cy.tsx import LoginForm from './LoginForm'

describe('LoginForm', () => { it('should render the elements', () => {
cy.mount(<LoginForm />)

    cy.get('img').should('be.visible')
    cy.contains('#passwordToggle', 'Show').should('be.visible')

    cy.on('window:alert', cy.spy().as('alert'))

    cy.log('**email empty**')
    cy.contains('button', 'Log in').click()
    cy.get('@alert').should(
      'have.been.calledWith',
      'Please enter a non-empty email',
    )

    cy.log('**password empty**')
    cy.get('#email').type('test@example.com')
    cy.contains('button', 'Log in').click()
    cy.get('@alert').should(
      'have.been.calledWith',
      'Please enter a non-empty password',
    )

    cy.log('**both filled**')
    cy.getByCy('PasswordInput').type('123456')
    cy.contains('button', 'Log in').click()
    cy.get('@alert').should(
      'have.been.calledWith',
      'Login submitted successfully!',
    )

}) })

Summary

Applying local state in components

Setting state value through an event

Handling events in React elements

Spying with Cypress
