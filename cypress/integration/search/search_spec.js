import {getColumnSelector} from "../../utils/utils"

context("Search test cases", function() {
    // Not really good solution
    let data = require("../../fixtures/applicants.json");

    beforeEach(() => {
        cy.visit("");
    }); 
    
    data.applicants.forEach(member => {
        it(`Search with First Name: ${member.first_name}`, function() {
            const fullName = member.first_name + " " + member.last_name;
            cy.enterSearchName(member.first_name);
            cy.submitSearch();
            cy.validateMemberFound(fullName, getColumnSelector(member.status));
        });
    });

    data.applicants.forEach(member => {
        it(`Search with Last Name: ${member.last_name}`, function() {
            const fullName = member.first_name + " " + member.last_name;
            cy.enterSearchName(member.last_name);
            cy.submitSearch();
            cy.validateMemberFound(fullName, getColumnSelector(member.status));
        });
    });

    data.applicants.forEach(member => {
        it(`Search with City: ${member.city}`, function() {
            const fullName = member.first_name + " " + member.last_name;
            cy.enterSearchCity(member.city);
            cy.submitSearch();
            cy.validateMemberFound(fullName, getColumnSelector(member.status));
        });
    });

    data.applicants.forEach(member => {
        it(`Search with Full Name: ${member.first_name + " " + member.last_name}`, function() {
            const fullName = member.first_name + " " + member.last_name;
            cy.enterSearchCity(fullName);
            cy.submitSearch();
            cy.validateMemberFound(fullName, getColumnSelector(member.status));
        });
    });

    it("Search with unexisting name", function(){
        cy.enterSearchName("asdasdkl;klk");
        cy.submitSearch();
        cy.validateNoResultsFound();
    });

    it("Clear button should clear Name field", function() {
        cy.validateInputFieldText("city", "");
        cy.enterSearchName("Test name");
        cy.submitSearch();
        cy.clearSearch();
        cy.validateInputFieldText("name", "");
    })

    it("Clear button should clear City field", function() {
        cy.enterSearchCity("Kyiv");
        cy.submitSearch();
        cy.clearSearch();
        cy.validateInputFieldText("city", "");
    })


    it("Clear button should clear both City and Name fields", function() {
        cy.enterSearchName("Test name");
        cy.enterSearchCity("Kyiv");
        cy.submitSearch();
        cy.clearSearch();
        cy.validateInputFieldText("name", "");
        cy.validateInputFieldText("city", "");
    })
});
