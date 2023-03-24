import PasswordInput from './PasswordInput'

describe('PasswordInput', () => {
  it('should render children: Input and Button', () => {
    cy.mount(<PasswordInput label="foo" />)

    cy.getByCy('Input').should('be.visible')
    cy.getByCy('Button').should('be.visible')
  })
})
