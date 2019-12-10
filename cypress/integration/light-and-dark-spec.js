/// <reference types="cypress" />

const visit = (darkAppearance) =>
  cy.visit('/', {
    onBeforeLoad (win) {
      cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: darkAppearance,
      })
    },
  })

const addsTodos = () => {
  cy.get('.new-todo')
  .type('learn testing{enter}')
  .type('be cool{enter}')

  cy.get('.todo-list li').should('have.length', 2)
  .first().find('.toggle').check()

  cy.contains('li', 'learn testing').should('have.class', 'completed')
}

it('adds 2 todos with light appearance', function () {
  visit(false)
  addsTodos()
})

it('adds 2 todos with dark appearance', function () {
  visit(true)
  addsTodos()
})
