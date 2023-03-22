## Overview

In this assignment, we will be re-writing a portion of the work that we did in
assignment 0 into React; we will be moving the entirety of what lives in the
single HTML file into their own respective files, and will be writing our first
React component! Stay tuned to adding event listeners, component lifecycles, and
state management in the upcoming assignments.

## Re-organize our code into modules

First, let’s break down the single HTML file in the lesson’s base into several
modules: styles.css, index.ts, app.tsx, head.tsx, and login-form.tsx.

At the end of the lesson, our source & cypress folders should look something like this:


```
lesson-1
├── cypress
  ├── e2e
    ├── sanity-spec.ts
├── src
  ├── App.css
  ├── App.cy.tsx
  ├── App.tsx
  ├── components
  │   ├── Footer.cy.tsx
  │   ├── Footer.tsx
  │   ├── LoginForm.cy.tsx
  │   └── LoginForm.tsx
  ├── main.tsx
  ├── styles.css
  ├── tsconfig.json
  └── vite-env.d.ts

```

Remove the files `logo.svg` , `favicon.svg`, `index.css`, `App.test.tsx`  from `./src/` . Delete `spec.cy.ts` from `./cypress/e2e/`.

We will use a template repo with React, TS, Cypress (e2e & ct), GHA with CI
architecture, Jest, ESLint, Prettier, Renovate, Husky, Lint-staged, and most of
the things you need to get started with a new project. Go to
https://github.com/muratkeremozcan/react-cypress-ts-vite-template, click
`Use this template` and `Create a new repository`. Once your repository is
created, clone it to your machine and install.

### Move the stylesheet rules into the CSS files

In our index.html, let’s move everything inside the <style> tag in the
`styles.css` file:

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

.footer {
    margin-top: 16px;
    text-align: center;
}

.footer>a {
    text-decoration: inherit;
    color: #03c;
}
```

### Move the HTML Elements into JSX

Let’s create our first react component! Move what’s inside that form tag to
LoginForm.tsx:

While doing so, make sure to refactor some of the attributes and single HTML
tags to turn our HTML into valid JSX:

- Adding self-enclosing tags for our <input />: all defined tags must be closed,
  either with the self-closing format or with a corresponding closing tag

- Moving class to className:
- relabelling for to htmlFor:

For a full list of attribute/labelling differences between HTML and React, check
out https://reactjs.org/docs/dom-elements.html#differences-in-attributes, or use
the linter as a guide on which properties would need to be re-labeled.

Create a folder and file `components/LoginForm.tsx`. Paste the After applying
all the updates, we should end up with something like this:

```tsx
// src/components/LoginForm.tsx
import React from 'react'

export default function LoginForm() {
  return (
    <form className="login-form">
      <img src="public/extend-logo.png" alt="Extend" />

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

TODO: find and add the Extend logo to `public/extend-logo.png`

TODO: identify the files at the end of the lesson, and remove them , ex:
`src/App.cy.tsx`

Let us quickly write a Cypress component test and ensure our component renders
properly.

First, we will perform a one time import of our styles to
`cypress/support/component.tsx` changing the file extension to `tsx`.

```tsx
// ./cypress/support/component.tsx

// put CT-only commands here
import './commands'
import '../../src/styles.css' // add this line

import {mount} from 'cypress/react18'

Cypress.Commands.add('mount', mount)
```

Since we copy pasted the html into our component, we will not perform TDD this
time, instead we will write some tests the traditional way. Let us start by
mounting the component and seeing it render.

```tsx
// ./src/components/LoginForm.cy.tsx
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)
  })
})
```

`yarn cy:open-ct` to start the component runner and execute the `LoginForm`
test. We see the component render in isolation, we can even ad-hoc test it.

![LoginForm-initial-mount](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3rupu0lsg6skaf3u151p.png)

For now the component does not do much, so we can verify that the elements
render.

```tsx
// ./src/components/LoginForm.cy.tsx
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)

    cy.get('#email').type('a')
    cy.get('#password').type('b')

    cy.get('#passwordToggle').should('be.visible')
    cy.get('[type="submit"]').should('be.visible')
    cy.get('img').should('be.visible')
  })
})
```

In addition to the login form, let’s add a footer component in our components
folder. Start with a failing test that only mounts the component:

```tsx
// src/components/Footer.cy.tsx
import Footer from './Footer'

describe('Footer', () => {
  it('should render', () => {
    cy.mount(<Footer />)
  })
})
```

In order to pass the test, let's create a basic component:

```tsx
// src/components/Footer.tsx
export default function Footer() {
  return <div>footer</div>
}
```

We want our footer to be a wrapping div with a class `footer`, text
`Don't have an account yet?&nbsp;`, a link to `https://www.extend.com/contact`
with text `Contact us`.

We can begin to write incremental, simple steps to satisfy the requirement.

```tsx
// src/components/Footer.cy.tsx
import Footer from './Footer'

describe('Footer', () => {
  it('should render', () => {
    cy.mount(<Footer />)

    cy.get('.footer')
      .contains("Don't have an account yet?")
})

```

```tsx
// src/components/Footer.tsx
export default function Footer() {
  return <div className="footer">Don't have an account yet?&nbsp;</div>
}
```

Under the `div` we want a link to `https://www.extend.com/contact` with text
`Contact us`.

```tsx
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

```tsx
// src/components/Footer.tsx
export default function Footer() {
  return (
    <div className="footer">
      Don't have an account yet?&nbsp;
      <a href="https://www.extend.com/contact">Contact us</a>
    </div>
  )
}
```

![Footer-component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8zabqwm50be5rkil00vd.png)

### Define the root app JSX, and clean up the rest of our HTML

After moving everything in our HTML, make sure to leave a single div element
where we can anchor our React app. At `./index.html`:

```html
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

In `src/App.tsx`, import both the components that we created in the previous
section, and let’s add a footer below the LoginForm:

```tsx
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

Since React will throw a syntax error if we do not wrap our components in a
single container, we’ll have to use a Fragment
([which also comes with a shortcode syntax!](https://reactjs.org/docs/fragments.html#short-syntax))
to encapsulate our compounded JSX.

We can quickly write a component test `./src/App.cy.tsx` :

```tsx
// ./src/App.cy.tsx

import App from './App'

describe('App', () => {
  it('renders children', () => {
    cy.mount(<App />)
  })
})
```

![App.cy.tsx](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3s8cer0umyfkgwlywmzc.png)

We see that both the children render, but what is a good way to verify that. One
best practice is to add a `data-cy` attribute to the top element of the
component with the component name. We can then use the custom selector `getByCy`
in the `cypress/support/commands.ts` file to ensure the component is rendered.

```tsx
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

To make our tests pass, we will add the `data-cy` attributes to our components.

```tsx
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

```tsx
// ./src/components/LoginForm.tsx

export default function LoginForm() {
  return (
    <form data-cy="LoginForm" className="login-form">
      <img src="public/extend-logo.png" alt="Extend" />

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

**Why Fragments, and not <div> ?**

At scale, we want to reduce nesting of our React app to improve readability when
inspecting or debugging our work. Adding an unnecessary <div> or <span> element
to wrap our component in a single parent container introduces another extra node
that will clutter the DOM tree, which may introduce unwanted side-effects, such
as:

- break specific layout (grid/flexbox) rules, requiring additional CSS
  properties to accommodate for the default block-behavior of a <div>
- Demand more memory usage for adding another layer to nest our components

in `./src/main.tsx`, we import our App component, and define how our React app
will be rendered inside our HTML:

```tsx
// ./src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

The 3 components we tested in isolation are working great, but we should also
verify that our app can get bundled and served. The only way to accomplish that
is with an e2e test. For now, it would suffice if our e2e test replicated the
component test for `App.cy.tsx`. Let's create a file
`cypress/e2e/sanity-spec.cy.ts` , and instead of mounting a component we will
visit the baseUrl.

```ts
// ./cypress/e2e/sanity-spec.cy.ts
describe('e2e sanity', () => {
  it('passes sanity', () => {
    cy.visit('/')

    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })
})
```

![e2e sanity](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8wwwfvk809apb2unljnh.png)

For this time, in order to demo our local utilities, we can quickly perform the CI checks locally prior to pushing. 

```bash

yarn validate # parallel typecheck, lint, format

# runs headless component tests w/o video & screenshots
yarn cy:run-ct-fast

# serves the app, runs headless e2e
yarn cy:run-e2e  
```

We will consider adding unit tests with Jest if we need them later. For now, since we deleted the `App.test.tsx` file, we do not have any tests in Jest, therefore we will need to replace our scripts at `package.json` file.

```json
"test": "echo add unit tests if needed",
"test:coverage": "echo add unit tests if needed",
```



Push the PR, and wait 3 minutes 

## Summary

Congratulations! We’ve now written our very first components in React, Cypress
component tests for each, and an e2e test. For the next assignment, we’ll be
covering common techniques and patterns that we’ll encounter in production code.

Your takeaways from this assignment should be:

- Building HTML into valid React-JSX syntax
- Exporting and importing React components
- Embedding a React single-page application (SPA) into our HTML

Now that you’ve completed the theory and assignment, let’s move on to
[Lesson 2: Components & Composition.]()
