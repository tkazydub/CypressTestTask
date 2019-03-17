import {MEMBERS} from "../constants/fields";

/**
 * Required to change Members status(Applied -> Iterviewing -> Hired) and vice versa
 *     @param {string} fullName - member's full name to search appropriate member
 *     @param {string} direction - button locator to click at 
 */

Cypress.Commands.add("moveMember", (fullName, direction) => {
    cy.contains(MEMBERS.MEMBER_FULL_NAME, fullName).then(res => {
        res.closest(MEMBERS.CONTAINER).find(direction).click();
    });
});
