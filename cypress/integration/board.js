const faker = require('faker')

describe('Board page', () => {
  const firstUser = faker.name.firstName()
  let sessionId

  it('should have a session', () => {
    cy.log(`Visiting http://localhost:3000`)
    cy.visit('/')
    cy.getCookie('connect.sid')
      .should('exist')
      .then(c => (sessionId = c))
  })

  it(`should access to the board with username as ${firstUser}`, () => {
    cy.get('input[type="text"]').type(firstUser)
    cy.get('button').click()
    cy.wait(150)
    cy.location('pathname').should('eq', '/board')
    cy.setCookie('connect.sid', sessionId.value)
  })

  it('should have 20 messages on the chat', () => {
    cy.setCookie('connect.sid', sessionId.value)
    cy.get('[data-test="message-list"]')
      .should('be.visible')
      .children()
      .its('length')
      .should('eq', 20)
  })

  it('should have an input, a checkbox, a submit button', () => {
    cy.get('[data-test="message-input"]').should('be.visible')
    cy.get('[data-test="privacy-checkbox"]').should('be.visible')
    cy.get('[data-test="submit-button"]').should('be.visible')
  })

  it(`should add a new message as ${firstUser}`, () => {
    cy.get('[data-test="message-input"]').type(`Hi, my name is ${firstUser}, nice to meet you!`)
    cy.get('[data-test="submit-button"]').click()
    // cy.wait(1000)
    // cy.get('[data-test="message-list"]')
    //   .children()
    //   .its('length')
    //   .should('eq', 21)
    // TODO sessions seems to be removed before every tests even with manually setting the cookie
  })
})
