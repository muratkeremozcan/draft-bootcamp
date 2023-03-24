describe('sanity', () => {
  it('should pass', () => {
    cy.visit('/')

    cy.get('#email').type('test@example.com')
    cy.get('#password').type('123456')

    cy.contains('#passwordToggle', 'Show').should('be.visible')
    cy.contains('button', 'Log in').should('be.visible')
  })
})
