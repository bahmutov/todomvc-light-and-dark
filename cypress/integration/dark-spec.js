/// <reference types="cypress" />
beforeEach(() => {
  cy.visit('/', {
    onBeforeLoad (win) {
      cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: true,
      })
    },
  })
})

it('adds 2 todos', function () {
  cy.get('.new-todo')
  .type('learn testing{enter}')
  .type('be cool{enter}')

  cy.get('.todo-list li').should('have.length', 2)
  .first().find('.toggle').check()

  cy.contains('li', 'learn testing').should('have.class', 'completed')
})
