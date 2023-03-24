## Overview

In this assignment, we will clean up some of our work from assignment 1 based on the takeaways from the previous lesson. 

Using React’s capabilities to define component props, we can refactor our login form as a collection of smaller, reusable components:

### Breaking down the form into sub-components

Create a Logo.tsx component:

```
// ./src/components/Logo.tsx
import LogoFile from '../assets/logo.svg'

const DEFAULT_IMAGE_SIZE_PX = '100%'

interface Props {
  width?: number | string
  height?: number | string
}

export default function Logo({
  width = DEFAULT_IMAGE_SIZE_PX,
  height = DEFAULT_IMAGE_SIZE_PX,
}: Props) {
  return <img src={LogoFile} width={width} height={height} />
}
```

An Input.tsx component:

```
// ./src/components/Input.tsx
import type {HTMLProps} from 'react'

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input className="form-input" type="text" id={id} {...restProps}></input>
    </div>
  )
}
```

A Button.tsx component:

```
// ./src/components/Button.tsx
import type {ButtonHTMLAttributes} from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({children, ...props}: Props) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  )
}
```

and a PasswordInput.tsx component, composed by combining our base Input and Button component:

```
// ./src/components/PasswordInput.tsx
import Input from './Input'
import type {Props as InputProps} from './Input'
import Button from './Button'

type Props = InputProps

export default function PasswordInput({label, id}: Props) {
  return (
    <div className="password-form-input">
      <Input label={label} />
      <Button id={id}>Show</Button>
    </div>
  )
}
```

### Apply the newly created components to our login form

```
// ./src/components/LoginForm.tsx
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
```

When you preview your work in the browser, it should almost exactly the same as it did at the end of the previous chapter:

***ONE MORE THING!*** Since that “Show” button isn’t in-lined with our password input, let’s go ahead and modify the style ruleset to match the previous layout. Visit the styles.css file and make the following changes (read the comments):

```
.form-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%; /* add this attribute */
}

/* add this new CSS class */
.password-form-input {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
}
```

Your page should now look perfect:

## Test



## Summary

Your takeaways from this assignment should be:

- Passing arguments into props
- Reusing components
- Embedding a React single-page application (SPA) into our HTML

Now that you’ve completed the theory and assignment, let’s move on to [Lesson 3: Events & State.]())