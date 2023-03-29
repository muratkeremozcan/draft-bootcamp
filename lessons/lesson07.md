## Overview

In this exercise, we will be refactoring the fetch APIs that we’ve defined in the previous assignment over to RTK-query. Using the same mock API https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1 to make the GET requests, we’ll be migrating the logic into a global state.

## RTK Query Setup: Initialize a Redux Store

Create a new redux folder in src, then define an empty store in redux/store.ts :

```
// ./src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {}
})
 
```

Once the store is created, set the Redux store to the rest of your React application component tree. In main.tsx:

```
// ./srcs/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

## Use RTK-Query for the products list and details API

First, let’s define all the related queries that we have on the products (GET: /products and products/:id) in a service file, src/redux/services/products.ts:

```
// Need to use the React-specific entry point to import createApi
// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {Product} from '../../types'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/',
  }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getProductById: builder.query<Product, string>({
      query: (id: string) => `products/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetProductsQuery, useGetProductByIdQuery} = productApi
```

 Add the products service in the redux store file:

```
import {configureStore} from '@reduxjs/toolkit'
import {productApi} from './services/products'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productApi.middleware),
})
```

Which should then set the productApi state in our app. Verify this with the Redux Devtools Chrome extension (get it [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)):



Now, let’s replace the fetch API defined in our ProductsList page to use the built-in dispatcher from RTK-query:

```
/* ProductsList page */
import {useGetProductsQuery} from '../redux/services/products'

  // existing code

  const {data: products, isFetching} = useGetProductsQuery()

  if (isFetching) {
    return <Spinner />
  }

  if (!products) {
    return null
  }
  
  //existing code
    
  {products.map(product => {
  
  //rest of code
import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {useNavigate} from 'react-router-dom'
import {formatCurrency} from '../utils/formatCurrency'
import Spinner from '../components/Spinner'
import {useGetProductsQuery} from '../redux/services/products'

export default function ProductsList() {
  const navigate = useNavigate()
  const handleClickTableRow = (id: string) => navigate(`/products/${id}`)
  const {data: products, isFetching} = useGetProductsQuery()

  if (isFetching) return <Spinner />

  if (!products) return null

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
          {products.map(product => (
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





Notice that data and isFetching variables are automatically created in RTK and exported through the dispatcher. They can be renamed via destructuring.

When making a request, you're able to track the state in several ways. You can always check data, status, and error to determine the right UI to render. In addition, useQuery also provides utility booleans like isLoading, isFetching, isSuccess, and isError for the latest request.

To debug, check out the Redux Devtools on your browser and the following set of transactions triggered by RTK-Query should appear: 

and our network should show that a single GET request has been performed!

Repeat the same exercise in ProductDetails.

You should be able to validate the functionality on both pages in the browser as well as with the Redux Devtools extension.

```
import styled from '@emotion/styled'
import {useParams, Link, Navigate} from 'react-router-dom'
import {formatCurrency} from '../utils/formatCurrency'
import Spinner from '../components/Spinner'
import {useGetProductByIdQuery} from '../redux/services/products'

export default function ProductDetails() {
  const {id} = useParams<{id: string}>()
  const {data: product, isFetching} = useGetProductByIdQuery(id as string)

  if (isFetching) return <Spinner />

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



## Test

If we execute either of the changed component tests (ProductDetails, ProductsList) we will encounter a descriptive error:

We wrapped the main app with <Provider store={store}> .. </Provider> at the file ./src/main.tsx and we simply have to do the same for our components.

- Can you modify ./src/pages/ProductsList.cy.tsx so that:
  - Provider is imported from react-redux, and store is imported from our src/redux/store.ts.
  - The mount is wrapped in the Provider.
  - A delay property is added to cy.intercept 's 2nd argument with a value (in milliseconds), so that we see the spinner as the component loads. (We removed the setTimeout that simulated the delay from the component code, we are going to handle that in the test)

```
// ./src/pages/ProductsList.cy.tsx

import ProductsList from './ProductsList'
import {BrowserRouter} from 'react-router-dom'
import products from '../../cypress/fixtures/products.json'
import {formatCurrency} from '../utils/formatCurrency'
import {Provider} from 'react-redux'
import {store} from '../redux/store'

describe('ProductsList', () => {
  it('should display each product with path', () => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/v1/products',
      },
      {fixture: 'products.json', delay: 100},
    ).as('getProducts')

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsList />
        </BrowserRouter>
      </Provider>,
    )
    cy.getByCy('Spinner').should('be.visible')

    cy.getByCy('table-row').should('have.length', products.length)

    products.forEach(({id, name, company, retail, isAvailable}) => {
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

- Can you repeat the same steps for ./src/pages/ProductDetails.cy.tsx?

```
// ./src/pages/ProductDetails.cy.tsx

import ProductDetails from './ProductDetails'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'
import products from '../../cypress/fixtures/products.json'
import {Provider} from 'react-redux'
import {store} from '../redux/store'
const product = products[0]

const routeWrappedMount = (
  WrappedComponent: React.ReactNode,
  route: string,
  path: string,
  options = {},
): Cypress.Chainable<MountReturn> => {
  window.history.pushState({}, '', route)
  const wrapped = (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route element={WrappedComponent} path={path} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
  return cy.mount(wrapped, options)
}

describe('ProductDetails', () => {
  it('should display product details', () => {
    const {id, name, retail, isAvailable} = product
    const route = `/${id}`
    const path = '/:id'

    cy.intercept(
      {
        method: 'GET',
        pathname: `/api/v1/products/${id}`,
      },
      {body: product, delay: 100},
    ).as('getProduct')

    routeWrappedMount(<ProductDetails />, route, path)
    cy.getByCy('Spinner').should('be.visible')
    cy.wait('@getProduct')

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



Our mounts for the two components are getting bloaty. Although they are not repeated in the test suite, it is a good exercise to create custom commands out of custom mounts. Take a look at [this slide](https://slides.com/muratozcan/cctdd#/3/9) (and use down arrow) for a how to guide and code link.

- Can you create a custom mount named storeWrappedMount at ./cypress/support/component.tsx?
  - Make the store parameter configurable, with a default value of our own store.
  - Create a type definition for the custom command at ./cypress.d.ts.
  - Use the custom command at the component test.

```
/* eslint-disable @typescript-eslint/no-explicit-any */
import {MountOptions, MountReturn} from 'cypress/react'

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Yields the element that partially matches the css class
       * ```
       * cy.getByClassLike('StyledIconBase') // where the class is class="StyledIconBase-ea9ulj-0 lbJwfL"
       * ```
       */
      getByClassLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts a React node wrapped with a store
       * @param component React Node to mount
       * @param customStore Custom store to pass into mount
       * @param options Additional options to pass into mount
       */
      storeWrappedMount(
        component: React.ReactNode,
        customStore?: any, // make the type better if you dare
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>
    }
  }
}
```



```
// put CT-only commands here
import './commands'

import {mount} from 'cypress/react18'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../../src/redux/store'

Cypress.Commands.add('mount', mount)

const storeWrappedMount = (
  WrappedComponent: React.ReactNode,
  customStore = store,
  options = {},
) =>
  cy.mount(
    <Provider store={customStore}>
      <BrowserRouter>{WrappedComponent}</BrowserRouter>
    </Provider>,
    options,
  )
Cypress.Commands.add('storeWrappedMount', storeWrappedMount)
```



```
import ProductsList from './ProductsList'
import products from '../../cypress/fixtures/products.json'
import {formatCurrency} from '../utils/formatCurrency'

describe('ProductsList', () => {
  it('should display each product with path', () => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/v1/products',
      },
      {fixture: 'products.json', delay: 100},
    ).as('getProducts')

    cy.storeWrappedMount(<ProductsList />)
    cy.getByCy('Spinner').should('be.visible')

    cy.getByCy('table-row').shouldT('have.length', products.length)

    products.forEach(({id, name, company, retail, isAvailable}) => {
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



We are going to repeat the same exercise for ./src/pages/ProductDetails.cy.tsx. 

- Can you create a custom mount named routeWrappedMount at ./cypress/support/component.tsx?
  - Make the store parameter configurable, with a default value of our own store.
  - Create a type definition for the custom command at ./cypress.d.ts.
  - Use the custom command at the component test.

```
/* eslint-disable @typescript-eslint/no-explicit-any */
import {MountOptions, MountReturn} from 'cypress/react'

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Yields the element that partially matches the css class
       * ```
       * cy.getByClassLike('StyledIconBase') // where the class is class="StyledIconBase-ea9ulj-0 lbJwfL"
       * ```
       */
      getByClassLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts a React node wrapped with a store
       * @param component React Node to mount
       * @param customStore Custom store to pass into mount
       * @param options Additional options to pass into mount
       */
      storeWrappedMount(
        component: React.ReactNode,
        customStore?: any,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts a React node wrapped with a store and Routes, for cases with react-router hooks such as `useParams`
       * @param component React Node to mount
       * @param customStore Custom store to pass into mount
       * @param options Additional options to pass into mount
       */
      routeWrappedMount(
        component: React.ReactNode,
        route: string,
        path: string,
        customStore?: any,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>
    }
  }
}
// put CT-only commands here
import './commands'

import {mount} from 'cypress/react18'
import {BrowserRouter, MemoryRouter, Route, Routes} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../../src/redux/store'

Cypress.Commands.add('mount', mount)

const storeWrappedMount = (
  WrappedComponent: React.ReactNode,
  customStore = store,
  options = {},
) =>
  cy.mount(
    <Provider store={customStore}>
      <BrowserRouter>{WrappedComponent}</BrowserRouter>
    </Provider>,
    options,
  )
Cypress.Commands.add('storeWrappedMount', storeWrappedMount)

const routeWrappedMount = (
  WrappedComponent: React.ReactNode,
  route: string,
  path: string,
  customStore = store,
  options = {},
) => {
  window.history.pushState({}, '', route)
  const wrapped = (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route element={WrappedComponent} path={path} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
  return cy.mount(wrapped, options)
}
Cypress.Commands.add('routeWrappedMount', routeWrappedMount)
import ProductDetails from './ProductDetails'
import {formatCurrency} from '../utils/formatCurrency'
import products from '../../cypress/fixtures/products.json'
const product = products[0]

describe('ProductDetails', () => {
  it('should display product details', () => {
    const {id, name, retail, isAvailable} = product
    const route = `/${id}`
    const path = '/:id'

    cy.intercept(
      {
        method: 'GET',
        pathname: `/api/v1/products/${id}`,
      },
      {body: product, delay: 100},
    ).as('getProduct')

    cy.routeWrappedMount(<ProductDetails />, route, path)
    cy.getByCy('Spinner').should('be.visible')
    cy.wait('@getProduct')

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



## Summary

Congratulations! We have now added the ability to use the basic APIs for Extend’s global state management tool. 

Your takeaways from this assignment should be:

- Basic usage and application of redux and RTK Query
- Understanding the flow of information from global store -> REST APIs are defined with RTK query → to our component
- Creating and using custom mounts in Cypress

Now that you’ve completed the theory and assignment, let’s move on to [Lesson 8]()! 