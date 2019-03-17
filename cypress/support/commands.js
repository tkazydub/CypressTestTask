/**
 * This file contains basic interractions with web elements
 */

 /**
  *  @param {string} field - input field locator
  *  @param {string} value - value to enter at input field
  */
Cypress.Commands.add("fillWith", (field, value) => {
    cy.get(field).clear().type(value);
});
/**
  *  @param {string} element - element locator to perfrom click at
  *  @param {string} parent - optional param, to specify parent element
  */
Cypress.Commands.add("clickElement", (element, parent=undefined) => {
    parent ? 
    parent.find(element).click() :
    cy.get(element).click();
});
