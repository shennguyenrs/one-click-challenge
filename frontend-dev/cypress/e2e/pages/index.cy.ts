describe("Homepage", () => {
  beforeEach("visit home address", () => {
    cy.visit("/");
  });

  it("should render all elements", () => {
    cy.get("h1").contains("One Click LCA - Front-end developer challenge");
    cy.get("p.btn-base").contains("Login");
    cy.get("p.btn-base").contains("Create new account");
  });

  it("should redirect to login page", () => {
    cy.get("p.btn-base").contains("Login").click();
    cy.url().should("include", "/login");
  });

  it("should redirect to register page", () => {
    cy.get("p.btn-base").contains("Create new account").click();
    cy.url().should("include", "/register");
  });
});

export {};
