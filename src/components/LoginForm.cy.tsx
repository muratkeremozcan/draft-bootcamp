import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('should render the elements', () => {
    cy.mount(<LoginForm />)

    cy.get('img').should('be.visible')
    cy.contains('#passwordToggle', 'Show').should('be.visible')

    cy.on('window:alert', cy.spy().as('alert'))

    cy.log('**email empty**')
    cy.contains('button', 'Log in').click()
    cy.get('@alert').should(
      'have.been.calledWith',
      'Please enter a non-empty email',
    )

    cy.log('**password empty**')
    cy.get('#email').type('test@example.com')
    cy.contains('button', 'Log in').click()
    cy.get('@alert').should(
      'have.been.calledWith',
      'Please enter a non-empty password',
    )

    cy.log('**both filled**')
    cy.getByCy('PasswordInput').type('123456')
    cy.contains('button', 'Log in').click()
    cy.get('@alert').should(
      'have.been.calledWith',
      'Login submitted successfully!',
    )
  })
})
