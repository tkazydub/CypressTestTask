import {MEMBERS, COLUMNS} from "../constants/fields";

Cypress.Commands.add("fillWith", (field, value) => {
    cy.get(field).clear().type(value)
})

Cypress.Commands.add("clickElement", (element, parent=undefined) => {
    parent ? 
    parent.find(element).click() :
    cy.get(element).click();
})


Cypress.Commands.add("moveMember", (fullName, direction) => {
    cy.contains(MEMBERS.MEMBER_FULL_NAME, fullName).then(res => {
        res.closest(MEMBERS.CONTAINER).find(direction).click();
    });
});
