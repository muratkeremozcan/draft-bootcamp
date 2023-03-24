describe('sanity', () => {
  it('should pass', () => {
    cy.visit('/')

    cy.get('img').should('be.visible')
  })
})
