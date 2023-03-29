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
