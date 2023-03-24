import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)

    cy.get('#email').type('test@example.com')
    cy.getByCy('PasswordInput').type('123456')

    cy.contains('#passwordToggle', 'Show').should('be.visible')
    cy.contains('button', 'Log in').should('be.visible')
  })
})
