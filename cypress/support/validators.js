/**
 * This file contains validation methods
 */
import {MEMBERS, COLUMNS, FILTERS, MOVEDIRECTIONS} from "../constants/fields";

/**
 * @param {number} expAmount - number of expected accounts per column
 * @param {string} column - column locator
 */
Cypress.Commands.add("validateMembersAmount", (expAmount, column) => {
    if (expAmount.length === 0) {
        cy.get(column).find(MEMBERS.CONTAINER).should("not.exist")
    } else {
        cy.get(column).find(MEMBERS.CONTAINER)
            .then((containers) => {
                        expect(containers, "Wrong number of members").to.have.length(expAmount.length)
            });
    }
});

/**
 * @param {string} fullName - Member's full name
 * @param {string} column - column locator
 * @param {boolean} isExist - optional value, to validate member's presense
 */
Cypress.Commands.add("validateMemberInStatus", (fullName, column, isExist = true) => {
    cy.get(column).contains(fullName).should(`${isExist ? "" : "not."}exist`)
});

/**
 * @param {string} fullName - Member's full name
 * @param {string} column - column locator
 */
Cypress.Commands.add("validateMemberFound", (fullName, column) => {
    Object.keys(COLUMNS).forEach(c => {
        COLUMNS[c] === column ?
            cy.validateMemberInStatus(fullName, COLUMNS[c]) :
            cy.validateMemberInStatus(fullName, COLUMNS[c], false);
    });
});

Cypress.Commands.add("validateNoResultsFound", () => {
    Object.keys(COLUMNS).forEach(c => {
        cy.get(COLUMNS[c]).find(MEMBERS.CONTAINER).should("not.exist");
    });
});

/**
 * @param {string} inputField - field type name or city
 * @param {string} expText - text to be present in the input field
 */
Cypress.Commands.add("validateInputFieldText", (inputField, expText) => {
    const field = inputField === "name" ? FILTERS.NAME_FIELD : FILTERS.CITY_FIELD;
    cy.get(FILTERS.FILTERS_SECTION).find(field).should("have.value", expText);
});

/**
 * @param {string} fullName - Member's full name
 * @param {string} direction - moving direction
 */
Cypress.Commands.add("validateMoveButtonIsNotPresent", (fullName, direction) => {
    cy.contains(MEMBERS.MEMBER_FULL_NAME, fullName).then(res => {
        const memberContainer = res.closest(MEMBERS.CONTAINER);
        if (direction === MOVEDIRECTIONS.UP) {
            expect(memberContainer.find(direction), "Expected UP button to not exist").to.have.length(0);
        } else {
            // MOVEDIRECTIONS.DOWN is used here as far as it is generic selector for UP and DOWN actions
            expect(memberContainer.find(MOVEDIRECTIONS.DOWN), "Wrong amoutn of navigation buttons").to.have.length(1);
            expect(memberContainer.find(direction), "Down button should not be present").to.be.exist;
        }
    });
});
