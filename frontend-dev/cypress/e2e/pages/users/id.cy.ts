describe("User Page", () => {
  before("load variables", () => {
    cy.fixture("authentication").then(function (auth) {
      this.auth = auth;
    });

    cy.fixture("resources").then(function (resources) {
      this.resources = resources;
    });
  });

  before("register new account", function () {
    cy.registerNew(
      this.auth.testerName,
      this.auth.loginedMail,
      this.auth.loginedPass
    );
  });

  beforeEach("visit user page as homepage address", () => {
    cy.visit("/");
  });

  after("delete user account", () => {
    cy.get("button").contains("Delete account").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });

  it("should render all elements", function () {
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

export {};
