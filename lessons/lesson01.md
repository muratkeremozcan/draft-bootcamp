## Overview

In this assignment, we will be re-writing a portion of the work that we did in
assignment 0 into React; we will be moving the entirety of what lives in the
single HTML file into their own respective files, and will be writing our first
React component! Stay tuned to adding event listeners, component lifecycles, and
state management in the upcoming assignments.

## Re-organize our code into modules

First, let’s break down the single HTML file in the lesson’s base into several
modules: `styles.css`, `App.tsx`, `main.tsx`, `Footer.tsx`, and `LoginForm.tsx`.

At the end of the lesson, our source & cypress folders should look something
like this:

```
1|- index.html 2├── cypress 3  ├── e2e 4    ├── sanity.cy.ts 5  ├── support 6├── src 7  ├── assets 8     ├── favicon.png 9     ├── logo.svg 10  ├── App.cy.tsx 11  ├── App.tsx 12  ├── components 13  │  ├── Footer.cy.tsx 14  │  ├── Footer.tsx 15  │  ├── LoginForm.cy.tsx 16  │  └── LoginForm.tsx 17  ├── main.tsx 18  ├── styles.css 19  ├── tsconfig.json 20  └── vite-env.d.ts
```

### Move the stylesheet rules into the CSS files

In our `index.html`, let’s move everything from inside the `<style>` tag to the
`styles.css` file:

```
1* { 2    box-sizing: border-box; 3} 4 5body { 6    background-color: #f3f6f9; 7    font-family: "Nunito Sans", sans-serif; 8    height: 100vh; 9    margin: 0; 10    display: flex; 11    justify-content: center; 12    align-items: center; 13} 14 15.login-form { 16    background-color: #fff; 17    border-radius: 12px; 18    display: flex; 19    flex-direction: column; 20    gap: 32px; 21    padding: 40px; 22    width: 440px; 23} 24 25.logo { 26    text-align: center; 27} 28 29.form-group { 30    display: flex; 31    flex-flow: row wrap; 32    justify-content: space-between; 33} 34 35.form-label { 36    display: block; 37    color: #090637; 38    font-size: 14px; 39    font-weight: 600; 40    padding-bottom: 6px; 41    width: 100%; 42} 43 44.form-input { 45    border: 1px solid #515963; 46    border-radius: 4px; 47    font-family: "Nunito Sans", sans-serif; 48    line-height: 38px; 49    padding: 0 8px; 50    flex: 1 0; 51} 52 53.form-input:focus { 54    box-shadow: #27aee4 0px 0px 0px 1px inset; 55    border: 1px solid #27aee4; 56    outline: none; 57} 58 59.form-input + .button { 60    margin-left: 8px; 61} 62 63.button { 64    border: none; 65    background-color: #03c; 66    border-radius: 4px; 67    color: #fff; 68    cursor: pointer; 69    font-weight: 600; 70    line-height: 40px; 71    padding: 0 8px; 72} 73 74.button:hover { 75    background-color: #101f7c; 76}
```

### Move the HTML Elements into JSX

Let’s create our first React component! Move what’s inside that form tag to
`LoginForm.tsx`:

While doing so, make sure to refactor some of the attributes and single HTML
tags to turn our HTML into valid JSX:

- Adding self-enclosing tags for our `<input />`: all defined tags must be
  closed, either with the self-closing format or with a corresponding closing
  tag

- Moving `class` to `className`:
- relabelling `for` to `htmlFor`:

For a full list of attribute/labelling differences between HTML and React, check
out
[![img](https://legacy.reactjs.org/favicon.ico)DOM Elements – React](https://reactjs.org/docs/dom-elements.html#differences-in-attributes),
or use the linter as a guide on which properties would need to be re-labeled.

After applying all the updates, we should end up with something like this:

1// ./src/components/LoginForm.tsx 2import logo from '../assets/logo.svg' 3
4export default function LoginForm() { 5 return ( 6
<form className="login-form"> 7 <img src={logo} alt="Extend" /> 8 9
<div className="form-group"> 10 <label className="form-label" htmlFor="email">
11 Email Address 12 </label> 13
<input className="form-input" type="text" name="email" id="email" /> 14 </div>
15 16 <div className="form-group"> 17
<label className="form-label" htmlFor="password"> 18 Password 19 </label> 20
<input 21 className="form-input" 22 type="password" 23 name="password" 24
id="password" 25 /> 26
<button className="button" type="button" id="passwordToggle"> 27 Show 28
</button> 29 </div> 30 31 <button className="button" type="submit"> 32 Log in 33
</button> 34 </form> 35 ) 36} 37 </form> 38 ) 39}

In addition to the login form, let’s add a footer component in our components
folder:

```
1// ./src/components/Footer.tsx 2export default function Footer() { 3  return ( 4    <div className="footer"> 5      Don't have an account yet? 6      <a href="https://www.extend.com/contact">Contact us</a> 7    </div> 8  ) 9}
```

Add the additional footer styles in `style.css`:

```
1.footer { 2    margin-top: 16px; 3    text-align: center; 4} 5 6.footer>a { 7    text-decoration: inherit; 8    color: #03c; 9}
```

### Define the root app JSX, and clean up the rest of our HTML

After moving everything out of our HTML, make sure to leave a single div element
where we can anchor our React app. At `./index.html`:

1<!DOCTYPE html> 2<html lang="en"> 3 <head> 4 <meta charset="UTF-8" /> 5
<meta name="viewport" content="width=device-width, initial-scale=1.0" /> 6
<meta http-equiv="X-UA-Compatible" content="ie=edge" /> 7 <title>Extend Client
Bootcamp</title> 8 </head> 9 10 <body> 11 <div id="root"></div> 12
<script type="module" src="/src/main.tsx"></script> 13 </body> 14</html>

In the root `App.tsx`, import both the components that we created in the
previous section, and let’s add a footer below the :

```
1// ./src/App.tsx 2import LoginForm from './components/LoginForm' 3import Footer from './components/Footer' 4import './styles.css' 5 6export default function App() { 7  return ( 8    <> 9      <LoginForm /> 10      <Footer /> 11    </> 12  ) 13}
```

Since React will throw a syntax error if we do not wrap our components in a
single container, we’ll have to use a Fragment
([which also comes with a shortcode syntax!](https://reactjs.org/docs/fragments.html#short-syntax))
to encapsulate our compounded JSX.

**Why Fragments, and not <div> ?**

At scale, we want to reduce nesting of our React app to improve readability when
inspecting or debugging our work. Adding an unnecessary `<div>` or `<span>`
element to wrap our component in a single parent container introduces another
extra node that will clutter the DOM tree, which may introduce unwanted
side-effects, such as:

- break specific layout (grid/flexbox) rules, requiring additional CSS
  properties to accommodate for the default block-behavior of a `<div>`
- Demand more memory usage for adding another layer to nest our components

In `main.tsx`, let’s import our `App` component, and define how our React app
will be rendered inside our HTML:

```
1// ./src/main.tsx 2import React from 'react' 3import ReactDOM from 'react-dom/client' 4import App from './App' 5import './styles.css' 6 7const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement) 8root.render( 9  <React.StrictMode> 10    <App /> 11  </React.StrictMode>, 12)
```

When you view your local application in your browser, it should look like this:

![img](blob:https://helloextend.atlassian.net/bb97d136-216c-4a86-b78c-ab6cc31c2b36#media-blob-url=true&id=7ca93830-c2c1-4900-b52c-14145cdbfc83&collection=contentId-1554317382&contextId=1554317382&height=757&width=1296&alt=)

## Test

If everything is correct so far, our e2e sanity test should work the same. Stop
serving the app. Start the app and the e2e tests with `yarn cy:open-e2e`.

![e2e-sanity](https://camo.githubusercontent.com/b95527f63a8d29a91c48d8d049f1f0a08261de3260957632af7a649ba3e38337/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f6d62386d39307573356d75683579736c6b7230392e706e67)

Let us create Cypress component tests to cover our components in isolation.

First, we will perform a one time import of our styles to
`cypress/support/component.tsx` .

```
1// ./cypress/support/component.tsx 2// put CT-only commands here 3 4import './commands' 5import '../../src/styles.css' // add this line 6 7import {mount} from 'cypress/react18' 8 9Cypress.Commands.add('mount', mount)
```

Create a file at `./src/components/LoginForm.cy.tsx`. Mount the `LoginForm`
component.

```
1// ./src/components/LoginForm.cy.tsx 2import LoginForm from './LoginForm' 3 4describe('LoginForm', () => { 5  it('should render the elements', () => { 6    cy.mount(<LoginForm />) 7  }) 8})
```

Stop the e2e runner if it is running, `yarn cy:open-ct` to start the component
runner. Alternatively, you can use the top left icon to switch test types
between Component and e2e on the fly. Execute the `LoginForm` component test. We
see the component render in isolation, we can even ad-hoc test it.

![LoginForm](https://camo.githubusercontent.com/d957f425aeb208c9febe94bd297c95baac17902e362530de587fc3d552f2bc3a/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f656b746d333369313175697675777a39747274332e706e67)

For now the component does not do much, so we can verify that the elements
render. Since our app is small, there will be some overlap between component and
e2e tests, but this is fine as it will let us practice component testing in a
familiar way. At the end of the component tests, the only additional value the
e2e test is providing will be sanity check that the app can be served.

Can you create a component test similar to the e2e sanity test? The main
difference should be `cy.visit()` vs `cy.mount()` because the rest of the
Cypress API is the same.

``

In addition to the login form, let’s add a footer component in our components
folder. Create a file `src/components/Footer.cy.tsx` and mount the component.

```
1// src/components/Footer.cy.tsx 2import Footer from './Footer' 3 4describe('Footer', () => { 5  it('should render', () => { 6    cy.mount(<Footer />) 7  }) 8})
```

Our component should render in isolation.

![Image description](https://camo.githubusercontent.com/d01791a3c9b12167fb5771c923552079f9c2bc90dda5711f3b2acda02dc0f981/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f3262736a346532673175763574797378757670692e706e67)

Can you write a test that:

- Verifies that `Don't have an account yet?` text exists under some element
- Has an anchor under the said element, with an href attribute and a value of
  `https://www.extend.com/contact`
- The anchor element has text `Contact us`

``

We can write a final component test for the App component. Usually we do not
need to, but it is a good showcase to see what to test where.

We already tested `Footer` and `LoginForm` components in isolation. There is no
need for test duplication. For `App` component, it would suffice to ensure that
the children render. Create a file at `./src/App.cy.tsx`.

```
1// ./src/App.cy.tsx 2 3import App from './App' 4 5describe('App', () => { 6  it('renders children', () => { 7    cy.mount(<App />) 8  }) 9})
```

![App](https://camo.githubusercontent.com/cce1b967dc09a4f61ca7910e6b15ddf50d30ba7727d105e0f53d98ffc53bb3d2/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f636c7531616b617535743073326b686a766732692e706e67)

We see that both the children render, but what is a good way to verify that? One
best practice is to add a `data-cy` attribute to the top element of the
component with the component name. We can then use the custom selector `getByCy`
in the `cypress/support/commands.ts` file to ensure the child component is
rendered.

Can you add the `data-cy` attributes to the top elements of `Footer` and
`LoginForm` components?

Can you add 2 checks to the `App` component test to verify the 2 children?
(Hint: use `cy.getByCy(...)` )

``

``

``

In order to demo our local utilities, we can quickly perform the local checks.

```
1# parallel typecheck, lint, format 2yarn validate  3 4# runs headless component tests w/o video & screenshots 5yarn cy:run-ct-fast 6 7# serves the app, runs headless e2e 8yarn cy:run-e2e
```

## Summary

Congratulations! We’ve now written our very first snippet in React! For the next
assignment, we’ll be covering common techniques and patterns that we’ll
encounter in production code.

Your takeaways from this assignment should be:

- Building HTML into valid React-JSX syntax
- Exporting and importing React components
- Embedding a React single-page application (SPA) into our HTML
- Cypress component testing

Now that you’ve completed the theory and assignment, let’s move on to
[Lesson 2: Components & Composition.](https://helloextend.atlassian.net/wiki/spaces/ENG/pages/1559429133)
