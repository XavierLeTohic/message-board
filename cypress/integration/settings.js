describe('Settings page', () => {
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`)
    cy.visit('/')
  })

  it('should have a title, a text input and a save button disabled', () => {
    cy.get('h1')
      .should('be.visible')
      .contains('Settings')
    cy.get('input')
      .should('be.visible')
      .invoke('attr', 'placeholder')
      .should('contain', 'Type your name')
    cy.get('button')
      .should('be.visible')
      .should('be.disabled')
  })

  it('should enable the button when filling the input', () => {
    cy.get('input').type('Xavier')
    cy.get('button').should('not.be.disabled')
  })

  it('should disable the button when clearing the input value', () => {
    cy.get('input').clear()
    cy.get('button').should('be.disabled')
  })

  it('should validate and redirect to /board', () => {
    cy.get('input').type('Xavier')
    cy.get('button').click()
    cy.wait(250)
    cy.location('pathname').should('eq', '/board')
  })
})
