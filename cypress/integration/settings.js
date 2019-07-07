const faker = require('faker')

describe('Settings page', () => {
  const randomName = faker.name.firstName()

  cy.log(`Visiting http://localhost:3000`)
  cy.visit('/')

  it('should have a title, an avatar, a text input and a save button disabled', () => {
    cy.get('h1')
      .should('be.visible')
      .contains('Settings')
    cy.get('[data-test="avatar"]').should('be.visible')
    cy.get('input[type="text"]')
      .should('be.visible')
      .invoke('attr', 'placeholder')
      .should('contain', 'Type your name')
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('be.disabled')
  })

  it('should enable the submit button when filling the input', () => {
    cy.get('input[type="text"]').type(randomName)
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('should disable the button when clearing the input value', () => {
    cy.get('input[type="text"]').clear()
    cy.get('button').should('be.disabled')
  })

  it('should randomize the avatar when clicking on it', () => {
    cy.get('[data-test="avatar"]')
      .invoke('attr', 'src')
      .then(oldSrc => {
        cy.get('[data-test="avatar"]').click()
        cy.wait(250)
        cy.get('[data-test="avatar"]')
          .invoke('attr', 'src')
          .should('not.be', oldSrc)
      })
  })

  it('should validate and redirect to /board', () => {
    cy.get('input[type="text"]').type(randomName)
    cy.get('button').click()
    cy.wait(150)
    cy.location('pathname').should('eq', '/board')
  })

  it('should clear cookies and not being able to choose the same username', () => {
    cy.clearCookies()
    cy.wait(250)
    cy.visit('/')
    cy.location('pathname').should('eq', '/')
    cy.get('input[type="text"]').type(randomName)
    cy.get('button').click()
    cy.wait(150)
    cy.get('[data-test="error-label"]')
      .should('be.visible')
      .contains('This name is not available')
  })

  it('should clear the error label when typing a character', () => {
    cy.get('input[type="text"]').type(`${randomName}s`)
    cy.get('[data-test="error-label"]').should('not.be.visible')
  })
})
