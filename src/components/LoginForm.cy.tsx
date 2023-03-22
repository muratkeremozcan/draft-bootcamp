import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)

    cy.get('#email').type('a')
    cy.get('#password').type('b')

    cy.get('#passwordToggle').should('be.visible')
    cy.get('[type="submit"]').should('be.visible')
    cy.get('img').should('be.visible')
  })
})
