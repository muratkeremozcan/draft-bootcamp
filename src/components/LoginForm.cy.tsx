import LoginForm from './LoginForm'

describe('LoginForm', {viewportWidth: 600, viewportHeight: 600}, () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)

    cy.get('img').should('be.visible')
    cy.contains('#passwordToggle', 'Show').should('be.visible')

    cy.on('window:alert', cy.spy().as('alert'))

    cy.log('**both empty**')
    cy.contains('button', 'Log in').click()
    cy.contains('email is a required field')
    cy.contains('password is a required field')

    cy.log('**password empty**')
    cy.get('#email').type('test@example.com')
    cy.contains('button', 'Log in').should('be.disabled')
    cy.contains('email is a required field').should('not.exist')
    cy.contains('password is a required field')

    cy.log('**both filled**')
    cy.getByCy('PasswordInput').type('123456')
    cy.contains('button', 'Log in').should('be.enabled').click()
    cy.get('@alert').should('have.been.calledWith', 'submitting')
  })
})
