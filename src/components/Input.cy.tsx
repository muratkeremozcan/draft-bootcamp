import Input from './Input'

describe('Input', () => {
  it('should display the input', () => {
    const label = 'foo'
    cy.mount(<Input label={label} id={''} />)

    cy.contains('label', label)
    cy.get('input').type(`this is ${label}`, {delay: 0})
    cy.get('input').should('have.value', `this is ${label}`)
  })
})
