import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pagesObjects/login.page"
const loginPage = new LoginPage;

Given("A web browser is at the saucelabs login page - tag demo", () => {
  cy.visit("/");
});

When("A user enters the username {string}, the password {string}, and clicks on the login button - tag demo",
  (table: { hashes: () => Array<{ username: string; password: string }> }) => {
    table.hashes().forEach((row) => {
      cy.log(row.username);
      cy.log(row.password);
      loginPage.submitLogin(row.username, row.password);
    });
  });

When("A user provides incorrect credentials, and clicks on the login button - tag demo",
  (table: { hashes: () => Array<{ username: string; password: string }> }) => {
    table.hashes().forEach((row) => {
      cy.log(row.username);
      cy.log(row.password);
      loginPage.submitLogin(row.username, row.password);
    });
  });

Then("the url will contains the inventory subdirectory - tag demo", () => {
  cy.url().should("contains", "/inventory.html");
});

Then("The error message {string} is displayed - tag demo", (errorMessage) => {
  loginPage.elements.errorMessage().should("have.text", errorMessage);
})
