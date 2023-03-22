import App from './App'

describe('App', () => {
  it('renders children', () => {
    cy.mount(<App />)

    cy.getByCy('LoginForm').should('be.visible')
    cy.getByCy('Footer').should('be.visible')
  })
})
