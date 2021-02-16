import {buildUser} from '../support/generate'

describe('registration', () => {
  it('should register a new user', () => {
    const user = buildUser()

    cy.visit('/')
    cy.findByText(/^Register$/i).click()
    cy.findByLabelText('Username').type(user.username)
    cy.findByLabelText('Password').type(user.password)
    cy.findByText(/^submit$/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.window()
      .its('window.localStorage.token')
      .should('be.a', 'string')
    cy.findByTestId('username-display').should('have.text', user.username)
  })

  it(`should throw an error message if there is an error registering`, () => {
    cy.visit('/register');
    cy.findByText(/submit/i).click();
  })
})
