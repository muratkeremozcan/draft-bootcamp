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
