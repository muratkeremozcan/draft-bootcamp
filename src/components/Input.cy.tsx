import Input from './Input'

describe('Input', () => {
  it('should display any label and input', () => {
    const label = 'foo'
    cy.mount(<Input label={label} />)

    cy.contains('label', label)
    cy.get('input').type(`this is ${label}`, {delay: 0})
    cy.get('input').should('have.value', `this is ${label}`)
  })
})
