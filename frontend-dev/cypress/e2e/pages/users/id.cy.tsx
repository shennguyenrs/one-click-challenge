describe("User Page", () => {
  before("load variables", () => {
    cy.fixture("authentication").then((auth) => {
      this.auth = auth;
    });

    cy.fixture("resources").then((resources) => {
      this.resources = resources;
    });
  });

  before("register new account", () => {
    cy.visit("/auth/register");
    cy.get("input[name='name']").type(this.auth.testerName);
    cy.get("input[name='email']").type(this.auth.loginedMail);
    cy.get("input[name='password']").type(this.auth.loginedPass);
    cy.get("input[name='confirmPassword']").type(this.auth.loginedPass);
    cy.get("button").contains("Register").click();
    cy.url().should("include", "/users/");
  });

  beforeEach("visit user page as homepage address", () => {
    cy.visit("/");
  });

  after("delete user account", () => {
    cy.get("button").contains("Delete account").click();
  });

  it("should render all elements", () => {
    cy.get("h1").contains(`Welcome back, ${this.auth.testerName}`);
    cy.get("button").contains("Logout");
    cy.get("button").contains("Delete account");
    cy.get("h1").contains("Used resources");
    cy.get("select").contains(this.resources.name);
    cy.get("button").contains("Add & Calculate");
    cy.get("p").contains("Total result");
    cy.get("li").should("have.length", 2).contains("0 kg");
    cy.get("th")
      .should("have.length", 4)
      .each(($th, index) => {
        expect($th).to.contain(["Resource", "Quantity", "CO2", "SO2"][index]);
      });
  });
});
