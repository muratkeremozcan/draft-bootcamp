import ProductDetail from './ProductDetail'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {listAllProducts} from '../mock-utils'
import type {MountReturn} from 'cypress/react'
import {formatCurrency} from '../utils/formatCurrency'

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

describe('ProductDetail', () => {
  it('should', () => {
    listAllProducts().forEach(({id, name, retail, isAvailable}) => {
      const route = `/${id}`
      const path = '/:id'
      routeWrappedMount(<ProductDetail />, route, path)

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
})
