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
