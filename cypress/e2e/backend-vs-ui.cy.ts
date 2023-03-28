import spok from 'cy-spok'
import type {Product} from '../../src/types'

describe('backend', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      pathname: '/api/v1/products',
    }).as('getProducts')
    cy.intercept({
      method: 'GET',
      pathname: '/api/v1/products/*',
    }).as('getProduct')

    cy.visit('/products')
  })

  const spokProduct = {
    company: spok.string,
    id: spok.string,
    isAvailable: spok.type('boolean'),
    name: spok.string,
    retail: spok.number,
  }

  it('should visit products, verify backend data and spot check UI', () => {
    cy.wait('@getProducts')
      .its('response')
      .should(
        spok({
          statusCode: 200,
          body: [spokProduct],
        }),
      )
      .its('body')
      .each(({name, company}: Product) => {
        cy.contains(name)
        cy.contains(company)
      })
  })

  it('should nav to a product, verify backend data and spot check UI', () => {
    cy.getByCy('table-row').should('have.length.gt', 0).first().click()

    cy.wait('@getProduct')
      .its('response')
      .should(
        spok({
          statusCode: 200,
          body: spokProduct,
        }),
      )
      .its('body')
      .then(({name, id}: Product) => {
        cy.contains(name)
        cy.contains(id)
      })
  })
})
