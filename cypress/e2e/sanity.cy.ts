describe('sanity', () => {
  it('should pass', () => {
    cy.visit('/')

    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })
})
