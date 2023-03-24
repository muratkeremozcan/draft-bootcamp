 

## Overview

In this assignment, we will be re-writing a portion of the work that we did in assignment 0 into React; we will be moving the entirety of what lives in the single HTML file into their own respective files, and will be writing our first React component! Stay tuned to adding event listeners, component lifecycles, and state management in the upcoming assignments.

## Re-organize our code into modules

First, let’s break down the single HTML file in the lesson’s base into several modules: styles.css, App.tsx, main.tsx, Footer.tsx, and LoginForm.tsx.

At the end of the lesson, our source & cypress folders should look something like this:

```
|- index.html
├── cypress
  ├── e2e
    ├── sanity.cy.ts
├── src
  ├── App.cy.tsx
  ├── App.tsx
  ├── components
  │   ├── Footer.cy.tsx
  │   ├── Footer.tsx
  │   ├── LoginForm.cy.tsx
  │   └── LoginForm.tsx
  ├── main.tsx
  ├── styles.css
  ├── tsconfig.json
  └── vite-env.d.ts
```

### Move the stylesheet rules into the CSS files

In our index.html, let’s move everything from inside the <style> tag to the styles.css file:

```
* {
    box-sizing: border-box;
}

body {
    background-color: #f3f6f9;
    font-family: "Nunito Sans", sans-serif;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    background-color: #fff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 40px;
    width: 440px;
}

.logo {
    text-align: center;
}

.form-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}

.form-label {
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

.form-input + .button {
    margin-left: 8px;
}

.button {
    border: none;
    background-color: #03c;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    line-height: 40px;
    padding: 0 8px;
}

.button:hover {
    background-color: #101f7c;
}
```

### Move the HTML Elements into JSX

Let’s create our first React component! Move what’s inside that form tag to LoginForm.tsx:

While doing so, make sure to refactor some of the attributes and single HTML tags to turn our HTML into valid JSX:

- Adding self-enclosing tags for our <input />: all defined tags must be closed, either with the self-closing format or with a corresponding closing tag 

- Moving class to className:
- relabelling for to htmlFor:

For a full list of attribute/labelling differences between HTML and React, check out https://reactjs.org/docs/dom-elements.html#differences-in-attributes, or use the linter as a guide on which properties would need to be re-labeled.  

After applying all the updates, we should end up with something like this:

```
// ./src/components/LoginForm.tsx
import logo from '../assets/logo.svg'

export default function LoginForm() {
  return (
    <form className="login-form">
      <img src={logo} alt="Extend" />

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input className="form-input" type="text" name="email" id="email" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
        />
        <button className="button" type="button" id="passwordToggle">
          Show
        </button>
      </div>

      <button className="button" type="submit">
        Log in
      </button>
    </form>
  )
}
   </form>
  )
}
```


In addition to the login form, let’s add a footer component in our components folder:

```
// ./src/components/Footer.tsx
export default function Footer() {
  return (
    <div className="footer">
      Don't have an account yet?&nbsp;
      <a href="https://www.extend.com/contact">Contact us</a>
    </div>
  )
}
```

Add the additional footer styles in style.css:

```
.footer {
    margin-top: 16px;
    text-align: center;
}

.footer>a {
    text-decoration: inherit;
    color: #03c;
}
```

### Define the root app JSX, and clean up the rest of our HTML

After moving everything out of our HTML, make sure to leave a single div element where we can anchor our React app. At ./index.html:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Extend Client Bootcamp</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```


In the root App.tsx, import both the components that we created in the previous section, and let’s add a footer below the :

```
// ./src/App.tsx
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import './styles.css'

export default function App() {
  return (
    <>
      <LoginForm />
      <Footer />
    </>
  )
}
```

Since React will throw a syntax error if we do not wrap our components in a single container, we’ll have to use a Fragment ([which also comes with a shortcode syntax!](https://reactjs.org/docs/fragments.html#short-syntax)) to encapsulate our compounded JSX.

**Why Fragments, and not <div> ?**

At scale, we want to reduce nesting of our React app to improve readability when inspecting or debugging our work. Adding an unnecessary <div> or <span> element to wrap our component in a single parent container introduces another extra node that will clutter the DOM tree, which may introduce unwanted side-effects, such as:

- break specific layout (grid/flexbox) rules, requiring additional CSS properties to accommodate for the default block-behavior of a <div>
- Demand more memory usage for adding another layer to nest our components

In main.tsx, let’s import our App component, and define how our React app will be rendered inside our HTML:

```
// ./src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

When you view your local application in your browser, it should look like this:



## Test

If everything is correct so far, our e2e sanity test should work the same. Stop serving the app. Start the app and the e2e tests with yarn cy:open-e2e.

Let us create Cypress component tests to cover our components in isolation.

First, we will perform a one time import of our styles to cypress/support/component.tsx .

```
// ./cypress/support/component.tsx
// put CT-only commands here

import './commands'
import '../../src/styles.css' // add this line

import {mount} from 'cypress/react18'

Cypress.Commands.add('mount', mount)
```

Create a file at ./src/components/LoginForm.cy.tsx. Mount the LoginForm component.

```
// ./src/components/LoginForm.cy.tsx
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)
  })
})
```

Stop the e2e runner if it is running, yarn cy:open-ct to start the component runner. Alternatively, you can use the top left icon to switch test types between Component and e2e on the fly. Execute the LoginForm component test. We see the component render in isolation, we can even ad-hoc test it.

For now the component does not do much, so we can verify that the elements render. Since our app is small, there will be some overlap between component and e2e tests, but this is fine as it will let us practice component testing in a familiar way. At the end of the component tests, the only additional value the e2e test is providing will be sanity check that the app can be served.

Can you create a component test similar to the e2e sanity test? The only difference should be cy.visit() vs cy.mount() because the rest of the Cypress API is the same.

```
// ./src/components/LoginForm.cy.tsx
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)

    cy.get('#email').type('test@example.com')
    cy.get('#password').type('123456')

    cy.contains('#passwordToggle', 'Show').should('be.visible')
    cy.contains('button', 'Log in').should('be.visible')
  })
})
```



In addition to the login form, let’s add a footer component in our components folder. Create a file src/components/Footer.cy.tsx and mount the component.

```
// src/components/Footer.cy.tsx
import Footer from './Footer'

describe('Footer', () => {
  it('should render', () => {
    cy.mount(<Footer />)
  })
})
```

Our component should render in isolation.

Can you write a test that:

- Verifies that Don't have an account yet? text exists under some element
- Has an anchor under the said element, with an href attribute and a value of https://www.extend.com/contact
- The anchor element has text Contact us

```
// src/components/Footer.cy.tsx
import Footer from './Footer'

describe('Footer', () => {
  it('should render', () => {
    cy.mount(<Footer />)

    cy.get('.footer')
      .contains("Don't have an account yet?")
      .find('a')
      .should('have.attr', 'href', 'https://www.extend.com/contact')
      .contains('Contact us')
  })
})
```



We can write a final component test for the App component. Usually we do not need to, but it is a good showcase to see what to test where.

We already tested Footer and LoginForm components in isolation. There is no need for test duplication. For App component, it would suffice to ensure that the children render. Create a file at ./src/App.cy.tsx.

```
// ./src/App.cy.tsx

import App from './App'

describe('App', () => {
  it('renders children', () => {
    cy.mount(<App />)
  })
})
```

We see that both the children render, but what is a good way to verify that? One best practice is to add a data-cy attribute to the top element of the component with the component name. We can then use the custom selector getByCy in the cypress/support/commands.ts file to ensure the child component is rendered.

Can you add the data-cy attributes to the top elements of Footer and LoginForm components?

Can you add 2 checks to the App component test to verify the 2 children? (Hint: use cy.getByCy(...) )

```
// ./src/App.cy.tsx

import App from './App'

describe('App', () => {
  it('renders children', () => {
    cy.mount(<App />)

    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })
})
```



```
// ./src/components/Footer.tsx
export default function Footer() {
  return (
    <div data-cy="Footer" className="footer">
      Don't have an account yet?&nbsp;
      <a href="https://www.extend.com/contact">Contact us</a>
    </div>
  )
}
```



```
// ./src/components/LoginForm.tsx

import logo from '../assets/logo.svg'

export default function LoginForm() {
  return (
    <form data-cy="LoginForm" className="login-form">
      <img src={logo} alt="Extend" />

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input className="form-input" type="text" name="email" id="email" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
        />
        <button className="button" type="button" id="passwordToggle">
          Show
        </button>
      </div>

      <button className="button" type="submit">
        Log in
      </button>
    </form>
  )
}
```



In order to demo our local utilities, we can quickly perform the local checks.

```
# parallel typecheck, lint, format
yarn validate 

# runs headless component tests w/o video & screenshots
yarn cy:run-ct-fast

# serves the app, runs headless e2e
yarn cy:run-e2e
```

## Summary

Congratulations! We’ve now written our very first snippet in React! For the next assignment, we’ll be covering common techniques and patterns that we’ll encounter in production code. 

Your takeaways from this assignment should be:

- Building HTML into valid React-JSX syntax  
- Exporting and importing React components
- Embedding a React single-page application (SPA) into our HTML
- Cypress component testing

Now that you’ve completed the theory and assignment, let’s move on to [Lesson 2: Components & Composition.]()
