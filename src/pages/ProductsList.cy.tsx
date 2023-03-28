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
