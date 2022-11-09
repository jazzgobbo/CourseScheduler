/* globals cy */
    
describe ('Test App', () => {

  it ('launches', () => {
    cy.visit("http://localhost:3000/");
  });

  it ('Spring courses shown when Spring selected', () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy=Spring]').click();
    cy.get('[data-cy=course]').should('contain', 'Spring');
  });

  it ('Winter courses shown when Spring selected', () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-cy=Winter]').click();
    cy.get('[data-cy=course]').should('contain', 'Winter');

  });



});