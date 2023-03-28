## Overview

In this assignment, we will create new routes and nested routes in our local
app, and explore several APIs that are available in react-router. We’ll also be
creating some new page components and use some mock data to populate them.

## Create Pages

We are at the point where we want to begin composing our components into pages.
To do that, let’s create a new pages folder under src. In this folder, we’ll
create 4 new page components.

./src/pages/Login.tsx

```
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'

export default function Login() {
  return (
    <>
      <LoginForm />
      <Footer />
    </>
  )
}
```

You can see how we’ve pulled our LoginForm and Footer components in.

./src/pages/NotFound.tsx

```
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <Wrapper>
      <Header>Page Not Found</Header>
      <Description>
        The page you're looking for isn't available. Try with another page or
        use the go home button below
      </Description>
      <RedirectLink to="/login">Back to login</RedirectLink>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'center',
})

const Header = styled.div({
  marginBottom: 16,
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const Description = styled.div({
  marginBottom: 16,
  color: '#090637',
  fontSize: 18,
})

const RedirectLink = styled(Link)({
  color: '#03c',
})
```

This page will act as a catchall for any urls that don’t have a match (we’ll get
to that).

./src/pages/ProductsList.tsx

```
import styled from '@emotion/styled'
import {listAllProducts} from '../mock-utils'
import {formatCurrency} from '../utils/formatCurrency'

export default function ProductsList() {
  return (
    <Wrapper>
      <Header>Products</Header>
      <Table>
        <thead>
          <TableRow>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Company</TableHeaderCell>
            <TableHeaderCell>Suggested Retail Price ($USD)</TableHeaderCell>
            <TableHeaderCell>In Stock?</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {listAllProducts().map(product => {
            return (
              <TableRow
                key={product.id}
                onClick={() => handleClickTableRow(product.id)}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.company}</TableCell>
                <TableCell>{formatCurrency(product.retail)}</TableCell>
                <TableCell>
                  {product.isAvailable ? 'Yes' : 'Sold out!'}
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'center',
})

const Header = styled.div({
  marginBottom: 16,
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const Table = styled.table({
  color: '#090637',
  fontSize: 14,
  fontWeight: 400,
  borderSpacing: 0,
  borderCollapse: 'collapse',
  textAlign: 'left',
})

const TableRow = styled.tr({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(233,233,233,0.9)',
  },
})

const TableHeaderCell = styled.th({
  color: '#969592',
  fontWeight: 400,
  border: '1px solid #dfdfde',
  padding: 8,
})

const TableCell = styled.td({
  border: '1px solid #dfdfde',
  padding: 8,
})
```

This page will show a list of our products in a table-type format.

./src/pages/ProductDetails.tsx

```
import styled from '@emotion/styled'
import { Link, Redirect} from 'react-router-dom'
import {findProductById} from '../mock-utils'
import {formatCurrency} from '../utils/formatCurrency'

export default function ProductDetails() {
  return (
    <Wrapper>
      <Header>{product.name}</Header>
      <Description>
        <p>
          <strong>ID</strong>: {product.id}
        </p>
        <p>
          <strong>MSRP (USD)</strong>: {formatCurrency(product.retail)}
        </p>
        <p>
          <strong>In Stock?</strong>: {product.isAvailable ? 'Yes' : 'No'}
        </p>
      </Description>
      <GoBack to="/products">Back to list</GoBack>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'left',
})

const Header = styled.div({
  margin: '16px 0',
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const GoBack = styled(Link)({
  textDecoration: 'inherit',
  color: '#03c',
})

const Description = styled.div({})
```

This page will display the details of a product when it’s been clicked.

## Create Utilities

We have our pages, but where are the products going to come from to populate
them? Instead of fetching them from an API (we’ll do that in a later chapter),
let’s create a utilize to return mock data to our application. For clean
separation, let’s create a new folder mock-utils under src and put our index.ts
file there.

./src/mock-utils/index.ts

```
// this will act as a placeholder for our list/source-by-ID APIs

interface Product {
  id: string
  name: string
  company: string
  retail: number
  isAvailable: boolean
}

const mockProducts: Product[] = [
  {
    id: 'SBX-1234',
    name: 'Sneakers 👟',
    company: 'Shoes4All',
    retail: 8999,
    isAvailable: true,
  },
  {
    id: 'LGH-001',
    name: 'Flashlight 🔦',
    company: 'Lumos LLC.',
    retail: 4999,
    isAvailable: true,
  },
  {
    id: '03072023-CRMC',
    name: 'Flower Vase 🌸',
    company: "Florean's Supplies",
    retail: 1900,
    isAvailable: false,
  },
  {
    id: 'XX02032023',
    name: 'Magical Wand 🪄',
    company: 'Ollivanders',
    retail: 52425,
    isAvailable: false,
  },
  {
    id: 'NO-CAP',
    name: 'Winter Hat 🧢',
    company: 'Bygone Ages',
    retail: 5200,
    isAvailable: true,
  },
  {
    id: 'SPRG-LG-24',
    name: 'Reusable coffee mug ☕️',
    company: 'Tweek Bros. Coffeehouse',
    retail: 2899,
    isAvailable: true,
  },
]

const listAllProducts = (): Product[] => mockProducts

const findProductById = (id: string): Product | null => {
  return mockProducts.find(p => p.id === id) || null
}

export {listAllProducts, findProductById}
```

Notice how this is a ts file and not a tsx file. Since this is a utility and
won’t be rendered by React we want it to be a normal ts file.

Finally, we need a utility to format currency easily. Let’s create a new folder
utils under src with our utility.

./src/utils/formatCurrency.ts

```
export const formatCurrency = (value: number, currencyCode = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })
  return formatter.format(value / 100)
}
```

You can see how this takes in the two basic props and then formats the currency
for US.

# Define Page Routes, Links, and Redirects

Now that we’ve created our pages, we need to tell React how to use them.

First, let’s import the required components into our App.tsx:

```
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Global, css} from '@emotion/react'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductsList from './pages/ProductsList'
import NotFound from './pages/NotFound'
```

Wrap your React components with the Router component and use the Route component
to define the URL path for each page, with the page’s component nested inside:

```
<BrowserRouter>
  <Routes>
    <Route path="/products" element={<ProductsList />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

You can see how we have our catch-all at the end. Because React Router processes
routes in descending order, you always want to put the catch-all last.

```
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Global, css} from '@emotion/react'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductsList from './pages/ProductsList'
import NotFound from './pages/NotFound'

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
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
```

# React Router Hooks

React Router provides several hooks to allow us access to the router state, and
to perform programmatic navigation and/or URL parsing. Here are some of the
commonly used hooks:

- useNavigate can be used to programmatically navigate to any url
- useLocation returns the current location (the current URL)
- useParams returns the parameters from the URL

In our data table, let’s add the ability to direct the user to a nested page
when the user clicks on the table:

```
// ./src/pages/ProductsList.tsx

import {useNavigate} from 'react-router-dom'

export default function ProductsList() {
  const navigate = useNavigate()
  const handleClickTableRow = (id: string) => navigate(`/products/${id}`)

  /* rest of the code... */
}
import styled from '@emotion/styled'
import {useNavigate} from 'react-router-dom'
import {listAllProducts} from '../mock-utils'
import {formatCurrency} from '../utils/formatCurrency'

export default function ProductsList() {
  const navigate = useNavigate()
  const handleClickTableRow = (id: string) => navigate(`/products/${id}`)

  return (
    <Wrapper>
      <Header>Products</Header>
      <Table>
        <thead>
          <TableRow>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Company</TableHeaderCell>
            <TableHeaderCell>Suggested Retail Price ($USD)</TableHeaderCell>
            <TableHeaderCell>In Stock?</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {listAllProducts().map(product => (
            <TableRow
              key={product.id}
              onClick={() => handleClickTableRow(product.id)}
              data-cy="table-row"
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.company}</TableCell>
              <TableCell>{formatCurrency(product.retail)}</TableCell>
              <TableCell>{product.isAvailable ? 'Yes' : 'Sold out!'}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'center',
})

const Header = styled.div({
  marginBottom: 16,
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const Table = styled.table({
  color: '#090637',
  fontSize: 14,
  fontWeight: 400,
  borderSpacing: 0,
  borderCollapse: 'collapse',
  textAlign: 'left',
})

const TableRow = styled.tr({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(233,233,233,0.9)',
  },
})

const TableHeaderCell = styled.th({
  color: '#969592',
  fontWeight: 400,
  border: '1px solid #dfdfde',
  padding: 8,
})

const TableCell = styled.td({
  border: '1px solid #dfdfde',
  padding: 8,
})
```

In the product details page, let’s get the product ID param from the URL and use
it to get the product:

```
// ./src/pages/ProductDetails.tsx

import {useParams, Link, Navigate} from 'react-router-dom'

export default function ProductDetails() {
  const {id} = useParams<{id: string}>()
  const product = findProductById(id as string)

  if (!product) return <Navigate to="/not-found" />

  /* rest of the code... */
}
import styled from '@emotion/styled'
import {useParams, Link, Navigate} from 'react-router-dom'
import {findProductById} from '../mock-utils'
import {formatCurrency} from '../utils/formatCurrency'

export default function ProductDetails() {
  const {id} = useParams<{id: string}>()
  const product = findProductById(id as string)

  if (!product) return <Navigate to="/not-found" />

  return (
    <Wrapper>
      <Header>{product.name}</Header>
      <Description>
        <p>
          <strong>ID</strong>: {product.id}
        </p>
        <p>
          <strong>MSRP (USD)</strong>: {formatCurrency(product.retail)}
        </p>
        <p>
          <strong>In Stock?</strong>: {product.isAvailable ? 'Yes' : 'No'}
        </p>
      </Description>
      <GoBack to="/products">Back to list</GoBack>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'left',
})

const Header = styled.div({
  margin: '16px 0',
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const GoBack = styled(Link)({
  textDecoration: 'inherit',
  color: '#03c',
})

const Description = styled.div({})
```

Go ahead and view your application in the browser. You should be able to see the
login page at http://localhost:3000/login, the products page at
http://localhost:3000/products and if you type in a random URL you should see
the NotFound page.

## Test

We added 4 new components. Let us begin to add component tests for them.

Create a file ./src/pages/Login.cy.tsx . We can move the test code from
./src/App.cy.tsx to here, since Login page is now what App component used to be.
Remove ./src/App.cy.tsx, we will cover it in an e2e test later. Also remove
./cypress/e2e/sanity.cy.ts .

Create a file ./src/pages/NotFound.cy.tsx and run the component test with the
below code using yarn cy:open-ct.

```
// ./src/pages/NotFound.cy.tsx

import NotFound from './NotFound'

describe('NotFound', () => {
  it('should render page text and link', () => {
    cy.mount(<NotFound />)
  })
})
```

We are getting an error because NotFound component is using Link element from
react-router-dom (check ./src/pages/NotFound.tsx). To enable react-router-dom
features, in ./src/App.tsx we wrap the component with <BrowserRouter> . We need
to do the same for our component test.

- Can you wrap the component mount with <BrowserRouter>, so that it mounts
  without errors?
- Can you add tests to check the text on the page, and the link?

```
// ./src/pages/NotFound.cy.tsx

import NotFound from './NotFound'
import {BrowserRouter} from 'react-router-dom'

describe('NotFound', () => {
  it('should render page text and link', () => {
    cy.mount(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    )

    cy.contains('Page Not Found')
    cy.contains(
      "The page you're looking for isn't available. Try with another page or use the go home button below",
    )
    cy.get('[href="/login"]')
  })
})
```

Create a new test at ./src/pages/ProductsList.cy.tsx.

```
// ./src/pages/ProductsList.cy.tsx

describe('ProductsList', () => {
  it('should display each product with path', () => {
    cy.mount(<ProductsList />)
    })
  })
})
```

- ProductList component is also using react-router. What do we have to do to
  mount the component?
- Can you reuse the mock listAllProducts in the test, and verify that table rows
  rendered are at the same length as the data? (hint use a data-cy attribute for
  table-row)
- For each product, can you verify the name, company, price, whether it is
  available or sold out?
- Can you click on each row and end up in a path with the id of the product?

```
// ./src/pages/ProductsList.cy.tsx

import ProductsList from './ProductsList'
import {BrowserRouter} from 'react-router-dom'
import {listAllProducts} from '../mock-utils'
import {formatCurrency} from '../utils/formatCurrency'

describe('ProductsList', () => {
  it('should display each product with path', () => {
    cy.mount(
      <BrowserRouter>
        <ProductsList />
      </BrowserRouter>,
    )

    cy.getByCy('table-row').should('have.length.gt', listAllProducts.length)

    listAllProducts().forEach(({id, name, company, retail, isAvailable}) => {
      cy.contains(name)
      cy.contains(company)
      cy.contains(formatCurrency(retail))
      if (isAvailable) {
        cy.contains('Yes')
      } else {
        cy.contains('Sold out!')
      }

      cy.getByCy('table-row').contains(name).click()
      cy.location('pathname').should('eq', `/products/${id}`)
    })
  })
})
```

Create a file ./src/pages/ProductDetails.cy.tsx. This is an interesting
component because we are getting the state entirely from the url we are on. If
we mount the component, even if we wrap it like the above, nothing will render.
Any time we do not see a component render, it is because the component cannot
acquire some state it is reliant upon.

- Can you mount the component in a similar fashion to
  [this example](https://github.com/muratkeremozcan/cypress-react-component-test-examples/blob/24f5d2e597ac9480c3ea5352c8126777dd6c7282/cypress/component/hooks/kyle-wds/react-router-useParams-component-test/react-router-test-useParams.cy.tsx#L18)?
  (No need for a command, a function will do for now.) (Check out this
  [6 minute video](https://www.youtube.com/watch?v=jYaDpuPQW9M&t=1s) for an
  elaborate explanation of how it works.)
- Similar to the previous test, can you reuse the mock listAllProducts in the
  test for a single item, and verify that name, price, whether it is available
  or not are all displayed? Can you also verify the back link?

// .src/pages/ProductDetails.cy.tsx

```
import ProductDetails from './ProductDetails'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {listAllProducts} from '../mock-utils'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'

const routeWrappedMount = (
  WrappedComponent: React.ReactNode,
  route: string,
  path: string,
  options = {},
): Cypress.Chainable<MountReturn> => {
  window.history.pushState({}, '', route)
  const wrapped = (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={WrappedComponent} path={path} />
      </Routes>
    </MemoryRouter>
  )
  return cy.mount(wrapped, options)
}

describe('ProductDetails', () => {
  it('should display product details', () => {
    const {id, name, retail, isAvailable} = listAllProducts()[0]
    const route = `/${id}`
    const path = '/:id'
    routeWrappedMount(<ProductDetails />, route, path)

    cy.contains(name)
    cy.contains(formatCurrency(retail))
    if (isAvailable) {
      cy.contains('Yes')
    } else {
      cy.contains('No')
    }

    cy.contains('[href="/products"]', 'Back to list')
  })
})
```

We are complete with the component tests. But, we removed the App component
test. Routing is usually a good border between component and e2e tests (although
we can do plenty at component level). It is a good idea to cover the App
component in an e2e test, and exercise some minimal routing.

Create an e2e test at ./cypress/e2e/routing.cy.ts. Either switch to e2e testing
within Cypress, or start e2e with yarn cy:open-e2e. We have 4 route varieties in
the App component that we want to cover in e2e. Here’s the starting code.

```
// ./cypress/e2e/routing.cy.ts

describe('Routing', () => {
  it('should visit unknown routes', () => {
    cy.visit('/')
  })

  it('should visit login', () => {
    cy.visit('/login')
  })

  it('should visit product and product detail', () => {
    cy.visit('/products')
  })
})
```

- Can you visit the base route and a non-existing route, and verify that we have
  some consistent text?
- Can you visit the /login route , verify that certain child components render?
- Can you visit the the /products route, and then:
- ensure that there are more than 0 products rendered, click any
- verify the route we have landed on (hint: use regex)
- extract the productId from the route and verify that it is displayed on the
  page
- exercise back navigation, and verify the route we land at
- finally, direct-navigate to the product path (hint: /products/productId) and
  verify productId is rendered

```
// ./cypress/e2e/routing.cy.ts

describe('Routing', () => {
  it('should visit unknown routes', () => {
    cy.visit('/')
    cy.contains('Page Not Found')

    cy.visit('/foo')
    cy.contains('Page Not Found')
  })

  it('should visit login', () => {
    cy.visit('/login')

    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })

  it('should visit product and product detail', () => {
    cy.visit('/products')

    cy.getByCy('table-row').should('have.length.gt', 0).first().click()

    cy.location('pathname')
      .should('match', /\/products\/(\w+)/)
      .then(productPath => {
        const productId = productPath.split('/')[2]
        cy.contains(productId)
        cy.contains('Back to list').click()

        cy.location('pathname').should('eq', '/products')

        cy.log('**direct navigation**')
        cy.visit(productPath)
        cy.contains(productId)
      })
  })
})
```

## Summary

Congratulations! You have set up routing in your application.

Your takeaways from this assignment should be:

- You can create routes and nested routes with React Router
- Use common hooks in your router to take advantage of URL location and
  parameters
- If you are wrapping the component in the source code, you have to do something
  similar in the component test to mount it successfully.

Now that you’ve completed the theory and assignment, let’s move on to
[Lesson 6: Data Fetching]().
