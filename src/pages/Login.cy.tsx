import Login from './Login'

describe('Login', () => {
  it('renders children', () => {
    cy.mount(<Login />)

    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })
})
