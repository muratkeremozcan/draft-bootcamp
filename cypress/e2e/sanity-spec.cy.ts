describe('e2e sanity', () => {
  it('passes sanity', () => {
    cy.visit('/')
    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })
})
