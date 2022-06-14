describe("Login page", () => {
  const correctMail = "testing2@gmail.com";
  const correctPass = "correctPass";
  const failedMail = "testing.com";
  const failedPass = "wrong";
  const loginedMail = "tester@gmail.com";
  const loginedPass = "testerpassword";
  const testerName = "Tester";

  before("register new account", () => {
    cy.visit("/auth/register");
    cy.get("input[name='name']").type(testerName);
    cy.get("input[name='email']").type(loginedMail);
    cy.get("input[name='password']").type(loginedPass);
    cy.get("input[name='confirmPassword']").type(loginedPass);
    cy.get("button").contains("Register").click();
    cy.url().should("include", "/users/");
    cy.get("button").contains("Logout").click();
  });

  beforeEach("visit login page", () => {
    cy.visit("/auth/login");
  });

  after("delete user account", () => {
    cy.visit("/");
    cy.url().should("include", "/users/");
    cy.get("button").contains("Delete account").click();
    cy.url().should("include", "/");
  });

  it("should render all elements", () => {
    cy.get("h1").contains("Login");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button").contains("Login").should("exist");
    cy.get("p[class=invisible]").should("exist").should("have.length", 3);
    cy.get("p").contains("Create new account").should("exist");
    cy.get("p").contains("Back to home").should("exist");
  });

  it("should redirect to home page", () => {
    cy.get("p").contains("Back to home").click();
    cy.url().should("include", "/");
  });

  it("should redirect to register page", () => {
    cy.get("p").contains("Create new account").click();
    cy.url().should("include", "/auth/register");
  });

  it("should failed to submit with empty email", () => {
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/auth/login");
    cy.get("p[class=errors]").contains("Email is required");
    cy.get("p[class=errors]").contains("Password is required");
  });

  it("should failed to submit with wrong email", () => {
    cy.get("input[name='email']").type(failedMail);
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/auth/login");
  });

  it("should failed to submit with empty password", () => {
    cy.get("input[name='email']").type(correctMail);
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/auth/login");
    cy.get("p[class=errors]").contains("Password is required");
  });

  it("should failed with wrong password length", () => {
    cy.get("input[name='email']").type(correctMail);
    cy.get("input[name='password']").type(failedPass);
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/auth/login");
    cy.get("p[class=errors]").contains(
      "Password must be at least 8 characters long"
    );
  });

  it("should failed to login with wrong registered information", () => {
    cy.get("input[name='email']").type(correctMail);
    cy.get("input[name='password']").type(correctPass);
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/auth/login");
    cy.get("p[class=errors]").contains("User not found");
  });

  it("should failed with login with wrong password", () => {
    cy.get("input[name='email']").type(loginedMail);
    cy.get("input[name='password']").type(correctPass);
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/auth/login");
    cy.get("p[class=errors]").contains("Password is not valid");
  });

  it("should login with correct user information", () => {
    cy.get("input[name='email']").type(loginedMail);
    cy.get("input[name='password']").type(loginedPass);
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/users/");
  });
});
