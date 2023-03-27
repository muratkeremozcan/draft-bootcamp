## Overview

In this assignment, we will clean up some of our work from assignment 1 based on
the takeaways from the previous lesson.

Using React’s capabilities to define component `props`, we can refactor our
login form as a collection of smaller, reusable components:

### Breaking down the form into sub-components

Create a `Logo.tsx` component:

```
1// ./src/components/Logo.tsx 2import LogoFile from '../assets/logo.svg' 3 4const DEFAULT_IMAGE_SIZE_PX = '100%' 5 6interface Props { 7  width?: number | string 8  height?: number | string 9} 10 11export default function Logo({ 12  width = DEFAULT_IMAGE_SIZE_PX, 13  height = DEFAULT_IMAGE_SIZE_PX, 14}: Props) { 15  return <img src={LogoFile} width={width} height={height} /> 16}
```

An `Input.tsx` component:

```
1// ./src/components/Input.tsx 2import type {HTMLProps} from 'react' 3 4export interface Props extends HTMLProps<HTMLInputElement> { 5  label: string 6} 7 8export default function Input({label, id, ...restProps}: Props) { 9  return ( 10    <div className="form-group"> 11      <label className="form-label" htmlFor={id}> 12        {label} 13      </label> 14      <input className="form-input" type="text" id={id} {...restProps}></input> 15    </div> 16  ) 17}
```

A `Button.tsx` component:

```
1// ./src/components/Button.tsx 2import type {ButtonHTMLAttributes} from 'react' 3 4type Props = ButtonHTMLAttributes<HTMLButtonElement> 5 6export default function Button({children, ...props}: Props) { 7  return ( 8    <button className="button" {...props}> 9      {children} 10    </button> 11  ) 12}
```

and a `PasswordInput.tsx` component, composed by combining our base `Input` and
`Button` component:

```
1// ./src/components/PasswordInput.tsx 2import Input from './Input' 3import type {Props as InputProps} from './Input' 4import Button from './Button' 5 6type Props = InputProps 7 8export default function PasswordInput({label, id}: Props) { 9  return ( 10    <div className="password-form-input"> 11      <Input label={label} /> 12      <Button id={id}>Show</Button> 13    </div> 14  ) 15}
```

### Apply the newly created components to our login form

```
1// ./src/components/LoginForm.tsx 2import Logo from './Logo' 3import Input from './Input' 4import PasswordInput from './PasswordInput' 5import Button from './Button' 6 7export default function LoginForm() { 8  return ( 9    <form className="login-form"> 10      <Logo /> 11      <Input id="email" label="Email Address" name="email" /> 12      <PasswordInput id="passwordToggle" label="Password" /> 13      <Button type="submit">Log in</Button> 14    </form> 15  ) 16}
```

When you preview your work in the browser, it should almost exactly the same as
it did at the end of the previous chapter:

![img](blob:https://helloextend.atlassian.net/7b25650f-d96f-4c29-a879-89e42466a4d4#media-blob-url=true&id=5efc660e-c736-4d60-bc17-4aba78c30290&collection=contentId-1559855151&contextId=1559855151&height=757&width=1296&alt=)

**_ONE MORE THING!_** Since that “Show” button isn’t in-lined with our password
input, let’s go ahead and modify the style ruleset to match the previous layout.
Visit the `styles.css` file and make the following changes (read the comments):

```
1.form-group { 2    display: flex; 3    flex-flow: row wrap; 4    justify-content: space-between; 5    width: 100%; /* add this attribute */ 6} 7 8/* add this new CSS class */ 9.password-form-input { 10    display: flex; 11    align-items: flex-end; 12    justify-content: space-between; 13    gap: 8px; 14}
```

Your page should now look perfect:

![img](blob:https://helloextend.atlassian.net/3930b779-1989-4802-86b5-ada1fff49ab8#media-blob-url=true&id=e3464199-85ff-4a12-a5e3-d07becd3e01c&collection=contentId-1559855151&contextId=1559855151&height=757&width=1296&alt=)

## Test

We will follow the order above and start with a component test for `Logo.tsx`.
Create a file at `./src/components/Logo.tsx`

```
1// ./src/components/Logo.cy.tsx 2 3import Logo from './Logo' 4 5describe('Logo', () => { 6  it('should render at 100%', () => { 7    cy.mount(<Logo />) 8  }) 9 10  it('should render at custom pixel width & height', () => { 11    // hint: mount with non-default props 12  }) 13}) 14
```

Can you verify that the width and height of the image are both `100%`?

Can you mount the component with non-default props, and verify that the image
width & height are rendered accordingly?

``

Next is the component test for `Input`. Create a file at
`./src/components/Input.cy.tsx`

```
1// ./src/components/Input.cy.tsx 2 3import Input from './Input' 4 5describe('Input', () => { 6  it('should display the input', () => { 7    cy.mount(<Input /*what prop do we need?*/ />) 8  }) 9})
```

Can you mount the component with a prop, ensure that it renders in an element?
Can you type into an element in this component and verify that the value
displays?

``

Let’s create a test for `Button.tsx` at `./src/components/Button.cy.tsx`.

```
1// ./src/components/Button.cy.tsx 2import Button from './Button' 3 4describe('Button', () => { 5  it('should contain button name', () => { 6    cy.mount(<Button />) 7  }) 8})
```

Nothing seems to render with that! The component is expecting children. Can you
pass a child into it, have something render and verify visibility?

``

Time for a parent component, `PasswordInput.tsx`, which includes 2 children
under it; `Button` and `Input`. We can see them in the render.

```
1// ./src/components/PasswordInput.cy.tsx 2import PasswordInput from './PasswordInput' 3 4describe('PasswordInput', () => { 5  it('should render children: Input and Button', () => { 6    cy.mount(<PasswordInput label="foo" />) 7  }) 8})
```

We already tested the child components in detail. How would you re-apply the
lesson 1 learning, and ensure that the child components are rendered?

``

``

``

Our `Login` component has vastly changed. There is a problem with a selector
when we run the `Login.cy.tsx` component test. How would you handle that best?

``

``

For learning purposes, we previous duplicated what we originally had in the e2e
sanity test into the Login component. In the real world there is no need for
such duplication; if it can be covered at a lower level with the same
confidence, we want to use component test instead of e2e. Our sanity e2e test is
failing at the moment; check it via `yarn cy:open-e2e` - alternatively you can
switch to e2e testing from the upper left icon and start the app via
`yarn start`.

We need a minimal e2e test to ensure something renders when we serve the app.
How can you trim the test so that it does not duplicate the `LoginForm`
component, but also ensure that child components of `App` component get
rendered? Hint: treat `App` component like a parent component.

```
1// ./cypress/e2e/sanity.cy.ts 2 3describe('sanity', () => { 4  it('should pass', () => { 5    cy.visit('/') 6  }) 7})
```

``

## Summary

Your takeaways from this assignment should be:

- Passing arguments into `props`
- Reusing components
- Embedding a React single-page application (SPA) into our HTML
- Avoiding duplication between parent vs child component tests, and avoiding
  duplication between e2e and component tests.

Now that you’ve completed the theory and assignment, let’s move on to
[Lesson 3: Events & State.](https://helloextend.atlassian.net/wiki/spaces/ENG/pages/1554383432)
