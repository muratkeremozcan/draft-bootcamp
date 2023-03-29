## Overview

In this exercise, we will be replacing the the hardcoded responses in the the app that we have built in the previous lessons: 

Use the mock API https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/products to make the following resource requests:

- GET: /products/:id where id is the unique product identifier

## Add Types

First off, we need to define the types that we expect for our product when fetching data. Under src create types.ts and define the shape of our product:

```
export interface Product {
  id: string
  name: string
  company: string
  retail: number
  isAvailable: boolean
}
```

## Add a GET request to the products list and detail pages

On the ProductsList page, we’ll be replacing the mock-utils calls with the GET request to retrieve the list of products, and store the result of that transaction in state.

First, import the hooks and types we need:

```
import {useEffect, useState} from 'react'
import type { Product } from '../types'
```

Then remove the mock import line:

```
import {listAllProducts} from '../mock-utils'
```

Next let’s define our state hooks and the API fetch:

```
export default function ProductsList() {
  const navigate = useNavigate()
  const handleClickTableRow = (id: string) => navigate(`/products/${id}`)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {    
    fetch('https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))   
  }, [])    
  
  {/* rest of code... */}
   
}
```

And finally, change the products mapper to use our new data:

```
{listAllProducts().map(product => {
```

becomes

```
{products.map(product => {
```

**Note:** To recap what we’ve learned so far on useState/useEffect, The second argument of the useEffect hook, [], is an array of dependencies. This means the callback function in the effect will only run when the component is first mounted.

- useEffect(fn, [a, b, c]) -> run the effect when a, or b, or c change
- useEffect(fn, [a]) -> run the effect when a changes
- useEffect(fn, []) -> run the effect when... nothing changes, that's why it runs just once on mount
- useEffect(fn) -> run the effect at every render

Try reloading the page, and you should see:

To confirm that the browser has performed a network request, check your Network tab (Right/Secondary Click anywhere on the page > Inspect > Network Tab)



To smooth out the transition from when the page is retrieving the data from the network, to when it re-renders the page to show the results from the API, we can add a “suspense” state in our application.

On the same page, let’s add a loading state inside ProductsList:

```
const [loading, setLoading] = useState(true)
```

Update the ProductsList so it returns the Table only when the loading state is set to false 

```
  if (loading) {
    return <Spinner />
  }

  return (
    //...
```

Let’s create a loading feedback-type component now, Spinner.tsx:

```
import styled from '@emotion/styled'

export default function Spinner() {
  return <Wrapper data-cy="Spinner">Loading{'.'.repeat(3)}</Wrapper>
}

const Wrapper = styled.div({
  border: 'none',
  fontSize: 14,
})
```

And import it in the page:

```
import Spinner from '../components/Spinner'
```

Finally, add the .finally call inside our fetch API to set the loading state to false once the network request is done with processing/setting our application state, after a 1 second delay:

```
useEffect(() => {
    setTimeout(() => {
      fetch('https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }, 500)
  }, [])
```

When you reload the page in the browser you should see the loading message for several seconds before the data loads.

```
import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {useNavigate} from 'react-router-dom'
import {formatCurrency} from '../utils/formatCurrency'
import Spinner from '../components/Spinner'
import type {Product} from '../types'

export default function ProductsList() {
  const navigate = useNavigate()
  const handleClickTableRow = (id: string) => navigate(`/products/${id}`)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      fetch('https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }, 500)
  }, [])

  if (loading) return <Spinner />

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



### Details Page

Repeat the same exercise with replacing the mockUtil in the ProductDetails page using the similar pattern:

- Define a state to store the fetched resource.
- Perform the data-fetch on GET: https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/products/:productId inside a useEffect. Use the router hooks from the previous assignment to set the product ID that needs to be retrieved. Grab the id from useParams.
- Ideally, add a suspense state.



```
import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {useParams, Link, Navigate} from 'react-router-dom'
import {formatCurrency} from '../utils/formatCurrency'
import Spinner from '../components/Spinner'
import type {Product} from '../types'

export default function ProductDetails() {
  const {id} = useParams<{id: string}>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }, 1000)
  }, [])

  if (loading) return <Spinner />

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

We will start simple with the Spinner component. Add a component test ./src/components/Spinner.cy.tsx , and simply verify that the component renders.

```
// ./src/components/Spinner.cy.tsx

import Spinner from './Spinner'

describe('Spinner', () => {
  it('should render the spinner', () => {
    cy.mount(<Spinner />)
    cy.getByCy('Spinner').should('be.visible')
  })
})
```




Our data is now coming from the real network. While we could test it in the component test, we really do not want to depend on the external api at a low level test; it has its place in e2e, isolated and small in number as possible.

Grab the mockProducts object from ./src/mock-utils/index.ts  and create a json file from it at ./cypress/fixtures/products.json . You can now delete ./src/utils folder.

```
[
  {
    "id": "SBX-1234",
    "name": "Sneakers 👟",
    "company": "Shoes4All",
    "retail": 8999,
    "isAvailable": true
  },
  {
    "id": "LGH-001",
    "name": "Flashlight 🔦",
    "company": "Lumos LLC.",
    "retail": 4999,
    "isAvailable": true
  },
  {
    "id": "03072023-CRMC",
    "name": "Flower Vase 🌸",
    "company": "Florean's Supplies",
    "retail": 1900,
    "isAvailable": false
  },
  {
    "id": "XX02032023",
    "name": "Magical Wand 🪄",
    "company": "Ollivanders",
    "retail": 52425,
    "isAvailable": false
  },
  {
    "id": "NO-CAP",
    "name": "Winter Hat 🧢",
    "company": "Bygone Ages",
    "retail": 5200,
    "isAvailable": true
  },
  {
    "id": "SPRG-LG-24",
    "name": "Reusable coffee mug ☕️",
    "company": "Tweek Bros. Coffeehouse",
    "retail": 2899,
    "isAvailable": true
  }
]
```



Let us focus on ./src/pages/ProductDetails.cy.tsx . Instead of the import from mock-utils, import the  json file and assign any of the products to a variable.

```
// ./src/pages/ProductDetails.cy.tsx

import ProductDetails from './ProductDetails'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'
import products from '../../cypress/fixtures/products.json'
const product = products[0]
```

- Can you make the test work with the new variable instead of the util function that we removed? (Hint: not really)

Mocking the network is the highest level mocking we can perform in our application. It is the most removed from the implementation details of the application and enables the test to more closely emulate real world usage. We will use the [cy.intercept](https://docs.cypress.io/api/commands/intercept#docusaurus_skipToContent_fallback) api which is analogous to [Mock Service Worker](https://testing-library.com/docs/react-testing-library/example-intro/#mock), a favorite of Kent Dodds when writing component tests with React Testing Library.

Given the current state of our test:

- Can you create an intercept and fill in the blanks for method, pathname, and the stubbed response?
- After the component is mounted, what should we wait for? (Hint: 2 checks)

```
// ./src/pages/ProductDetails.cy.tsx

import ProductDetails from './ProductDetails'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'
import products from '../../cypress/fixtures/products.json'
const product = products[0]

const routeWrappedMount = (
  ...
}

describe('ProductDetails', () => {
  it('should display product details', () => {
    const {id, name, retail, isAvailable} = ...

    cy.intercept(
       {
         method: /*FILL IN THE METHOD NAME*/,
         pathname: /*WHAT PATH IS THE COMPONENT HITTING?*/,
       },
       {body: /*WHAT SHOULD THE STUBBED RESPONSE BE?*/ },
    ).as('getProduct')

    routeWrappedMount(<ProductDetails />, route, path)
    
    // WHAT SHOULD WE WAIT FOR?

    cy.contains(name)
    ....
  })
})
```

##  

```
// ./src/pages/ProductDetails.cy.tsx

import ProductDetails from './ProductDetails'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'
import products from '../../cypress/fixtures/products.json'
const product = products[0]

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
    const {id, name, retail, isAvailable} = product
    const route = `/${id}`
    const path = '/:id'

    cy.intercept(
      {
        method: 'GET',
        pathname: `/api/v1/products/${id}`,
      },
      {body: product},
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



At ./src/pages/ProductsList.cy.tsx do a similar change with the json import import products from '../../cypress/fixtures/products.json' and remove mock-utils folder reference. 

If we run the component as it is, we see that it is hitting the real network. It would be hard and unreliable to  keep verifying the data as it is. Again, mocking the network is a great solution.

Given the current state of our test:

- Can you create an intercept and fill in the blanks for method, pathname, and the stubbed response?
- What else should change in the test?

```
// ./src/pages/ProductsList.cy.tsx

import ProductsList from './ProductsList'
import {BrowserRouter} from 'react-router-dom'
import products from '../../cypress/fixtures/products.json'
import {formatCurrency} from '../utils/formatCurrency'

describe('ProductsList', () => {
  it('should display each product with path', () => {
    cy.intercept(
      {
         method: /*FILL IN THE METHOD NAME*/,
         pathname: /*WHAT PATH IS THE COMPONENT HITTING?*/,
      },
      {fixture: /*THE NAME OF THE JSON FILE, root being ./cypress/fixtures */},
    ).as('getProducts')

    cy.mount(....
    
    })
  })
})
// ./src/pages/ProductsList.cy.tsx

import ProductsList from './ProductsList'
import {BrowserRouter} from 'react-router-dom'
import products from '../../cypress/fixtures/products.json'
import {formatCurrency} from '../utils/formatCurrency'

describe('ProductsList', () => {
  it('should display each product with path', () => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/v1/products',
      },
      {fixture: 'products.json'},
    ).as('getProducts')

    cy.mount(
      <BrowserRouter>
        <ProductsList />
      </BrowserRouter>,
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





Those are all the changes for component tests. Let us have a look at our e2e test at ./cypress/e2e/routing.cy.ts. It works, and now it is hitting the real network. Do we need the routing test to have real network data? 


Test isolation is the idea, and e2e has its place, but not in the routing test. We can convert the test to what we call a ui-integration test. Like an e2e, but it stubs the network. It is great for testing features like routing and state management outside the component, or when multiple components need to integrate & interact with each other. For a more elaborate explanation, take a look at this [5 minute read](https://github.com/NoriSte/ui-testing-best-practices/blob/master/sections/testing-strategy/component-vs-integration-vs-e2e-testing.md).

Executing the routing test, we see that the network is only called in the third it block; for products and for a product.

- Can you create the two intercepts and stub the network? (Hint: they are identical to the component test interceptions)
- When should we wait for the network? (Hint: at two spots)



```
// ./cypress/e2e/routing.cy.ts

import products from '../../cypress/fixtures/products.json'
const product = products[0]

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
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/v1/products',
      },
      {fixture: 'products.json'},
    ).as('getProducts')
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/v1/products/*',
      },
      {body: product},
    ).as('getProduct')

    cy.visit('/products')
    cy.wait('@getProducts')

    cy.getByCy('table-row').should('have.length.gt', 0).first().click()
    cy.wait('@getProduct')

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



Test isolation is the idea, and we have a need for a true e2e test. As we hit the products api, we can verify the shape of the data. We can further spot check the UI with some of this data. A full check would be redundant with the component tests but a spot check gives enough confidence without effort duplication.

Create the test ./cypress/e2e/backend-vs-ui.cy.ts . We will use the [cy-spok library](https://github.com/bahmutov/cy-spok) that will save loads of effort, making concise, comprehensive but generic assertions about the shape of the data.

We will intercept the network, this time spy on it vs stub it, and visit the /products url before each test. The intercepts will be very similar to the above, but without the 2nd argument for fixture or body. In the tests we will wait for the network, make some assertions, and do spot UI checks. Below is the outline:

```
// ./cypress/e2e/backend-vs-ui.cy.ts

import spok from 'cy-spok'
import type {Product} from '../../src/types'

describe('backend vs ui', () => {
  beforeEach(() => {
    cy.intercept({
      method: /*ENTER METHOD NAME/*,
      pathname: /*ENTER THE PATH/*,
    }).as('getProducts')
    cy.intercept({
      method: /*ENTER METHOD NAME/*,
      pathname: /*ENTER THE PATH/*,
    }).as('getProduct')

    cy.visit('/products')
  })
  
  it('should visit products, verify backend data and spot check UI', () => {
    cy.wait('@getProducts')
      .its('response')
      .should(
        /*SPOK/*
      )
      .its('body')
      .each(....
        /*UI CHECKS/*
      })
  })

  it('should nav to a product, verify backend data and spot check UI', () => {
    cy.getByCy('table-row').should('have.length.gt', 0).first().click()

    cy.wait('@getProduct')
      .its('response')
      .should(
        /*SPOK/*
      )
      .its('body')
      .then(....
        /*UI CHECKS/*
      })
  })
})
```

Pay attention to the usage of hooks; at Extend stateless, order independent tests are an unwritten law, meaning every single it block should be able to execute with a it.only. Mind that a spy (the intercept) should always occur before the event that causes it (the visit, the click).

- Can you fill in the spok assertions, checking both the status code and the body? 
  A spok assertion is just an object, looks the same as the devtools network data on the browser. [Here are some examples of spok assertions](https://github.com/muratkeremozcan/cypressExamples/blob/001ceec8e0e045ea12a71b840e379e6df14ad250/cypress-api-spok/cypress/integration/pokemon-api-spok.spec.ts#L3):
   {    company: /* should be a string */,    id: /* should be a string */,    isAvailable: /* should be a boolean */,    name: /* should be a string */,    retail: /* should be a number */,  }
- Can you spot check the UI minimally?

##   Summary

Congratulations! We have now added the ability to retrieve information on our app from a mock server! 

Your takeaways from this assignment should be:

- Understanding the pattern of how we can initiate a transaction between our frontend, and the backend
- Basic usage of JavaScript’s fetch API
- Managing the data flow of how data gets retrieved and saved in our components
- Mocking the network, vs spying on the network
- What test type is appropriate where; component, vs ui-integration, vs e2e

Now that you’ve completed the theory and assignment, let’s move on to [Lesson 7]()! 