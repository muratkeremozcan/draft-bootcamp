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
  <Label className="form-label" htmlFor={id}>
    {label}
  </Label>
  <FormInput className="form-input" type="text" id={id} {...restProps} />
</FormGroup>
```

Repeat this process for all our CSS classes and corresponding components. When you are done, remove the old CSS files from your project.

## App

We are going to have to do something special with our App.tsx. We need to set some global styles that apply to the whole application. To do that we use a Global component and set the styles like this:

```
import {Fragment} from 'react'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import { Global, css } from '@emotion/react'

export default function App() {
  return (
    <Fragment>
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
    </Fragment>
  )
}
```

Check your browser and the form should look like it did before:

## Test

(Murat)

## Summary

Your takeaways from this assignment should be:

-  Declaring CSS style selectors in CSS-in-JS notation. 
  - Let’s automate! For hints on converting CSS stylesheets to styled-components object-notation syntax, Check out https://transform.tools/css-to-js 

Now that you’ve completed the theory and assignment, let’s move on to [Lesson 5: Routing]().
