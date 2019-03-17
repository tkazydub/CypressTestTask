import {COLUMNS, MOVEDIRECTIONS} from "../../constants/fields";
import { STATUSES } from "../../constants/common";

context("Navigation test cases", function() {
    beforeEach(() => {
        cy.fixture('applicants').as('testData');
        cy.visit("");
    });

    it("Check initial members statuses", function() {
        const expAmountOfAppliedUsers = this.testData.applicants.filter(member => member.status === STATUSES.APPLIED),
        expAmountOfInterviewUsers = this.testData.applicants.filter(member => member.status === STATUSES.INTERVIEWING),
        expAmountOfHiredUsers = this.testData.applicants.filter(member => member.status === STATUSES.HIRED);
        
        cy.validateMembersAmount(expAmountOfAppliedUsers, COLUMNS.APPLIED_COLUMN);
        cy.validateMembersAmount(expAmountOfInterviewUsers, COLUMNS.INTERVIEWING_COLUMN);
        cy.validateMembersAmount(expAmountOfHiredUsers, COLUMNS.HIRED_COLUMN);
    });

    it("Move member from Applied -> Interviewing -> Hired status", function() {
        const appliedMember = this.testData.applicants.find(d => d.status === STATUSES.APPLIED);
        const appliedMemberFullName = appliedMember.first_name + " " + appliedMember.last_name;

        cy.moveMember(appliedMemberFullName, MOVEDIRECTIONS.UP);
        cy.validateMemberInStatus(appliedMemberFullName, COLUMNS.INTERVIEWING_COLUMN);
        cy.enterSearchName(appliedMember.first_name);
        cy.submitSearch();
        cy.validateMemberFound(appliedMemberFullName, COLUMNS.INTERVIEWING_COLUMN);
        cy.clearSearch();
        cy.moveMember(appliedMemberFullName, MOVEDIRECTIONS.UP);
        cy.validateMemberInStatus(appliedMemberFullName, COLUMNS.HIRED_COLUMN);
        cy.enterSearchName(appliedMember.first_name);
        cy.submitSearch();
        cy.validateMemberFound(appliedMemberFullName, COLUMNS.HIRED_COLUMN);
        cy.clearSearch(); 
    });

    it("Move member from Hired -> Interviewing -> Applied status", function() {
       const hiredMember = this.testData.applicants.find(d => d.status === STATUSES.HIRED),
            hiredMemberFullName = hiredMember.first_name + " " + hiredMember.last_name;

       cy.moveMember(hiredMemberFullName, MOVEDIRECTIONS.DOWN);
       cy.validateMemberInStatus(hiredMemberFullName, COLUMNS.INTERVIEWING_COLUMN);
       cy.enterSearchName(hiredMember.first_name);
       cy.submitSearch();
       cy.validateMemberFound(hiredMemberFullName, COLUMNS.INTERVIEWING_COLUMN);
       cy.clearSearch();
       cy.moveMember(hiredMemberFullName, MOVEDIRECTIONS.DOWN);
       cy.validateMemberInStatus(hiredMemberFullName, COLUMNS.APPLIED_COLUMN);
       cy.enterSearchName(hiredMember.first_name);
       cy.submitSearch();
       cy.validateMemberFound(hiredMemberFullName, COLUMNS.APPLIED_COLUMN);
       cy.clearSearch();
   });

   it("Unable to move member UP from Hired state", function() {
        const hiredMember = this.testData.applicants.find(d => d.status === STATUSES.HIRED),
            hiredMemberFullName = hiredMember.first_name + " " + hiredMember.last_name;

        cy.validateMoveButtonIsNotPresent(hiredMemberFullName, MOVEDIRECTIONS.UP);    
   });

   it("Unable to move member DOWN from Applied state", function() {
        const appliedMember = this.testData.applicants.find(d => d.status === STATUSES.APPLIED),
            appliedMemberFullName = appliedMember.first_name + " " + appliedMember.last_name;

        cy.validateMoveButtonIsNotPresent(appliedMemberFullName, MOVEDIRECTIONS.DOWN);    
    });
});
