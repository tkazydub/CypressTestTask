import { FILTERS } from "../constants/fields";

/** 
 * Is used to click on the search button
 */
Cypress.Commands.add("submitSearch", function() {
    cy.get(FILTERS.FILTERS_SECTION).then(res => {
        cy.clickElement(FILTERS.SUBMIT_BUTTON, res);
    });
});

/** 
 * Is used to click on the clear button
 */
Cypress.Commands.add("clearSearch", function() {
    cy.get(FILTERS.FILTERS_SECTION).then(res => {
        cy.clickElement(FILTERS.CLEAR_BUTTON, res);
    });
});

/** 
 * Is to enter search params to name field
 *    @param {string} name - value to enter in the search field
 */
Cypress.Commands.add("enterSearchName", function(name) {
    cy.fillWith(FILTERS.NAME_FIELD, name);
});

/** 
 * Is to enter search params to city field
 *    @param {string} city - value to enter in the search field
 */
Cypress.Commands.add("enterSearchCity", function(city) {
    cy.fillWith(FILTERS.CITY_FIELD, city);
});
