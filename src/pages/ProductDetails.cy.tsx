import ProductDetails from './ProductDetails'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'
import products from '../../cypress/fixtures/products.json'

// https://github.com/muratkeremozcan/cypress-react-component-test-examples/blob/24f5d2e597ac9480c3ea5352c8126777dd6c7282/cypress/component/hooks/kyle-wds/react-router-useParams-component-test/react-router-test-useParams.cy.tsx#L18

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
    const product = products[0]
    const {id, name, retail, isAvailable} = product
    const route = `/${id}`
    const path = '/:id'

    cy.intercept(
      {
        method: 'GET',
        pathname: `/api/v1/products/${id}`,
      },
      {body: product},
    ).as('getProducts')

    routeWrappedMount(<ProductDetails />, route, path)
    cy.getByCy('Spinner').should('be.visible')

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
