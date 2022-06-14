describe("User Page", () => {
  const loginedMail = "tester@gmail.com";
  const loginedPass = "testerpassword";
  const testerName = "Tester";
  const firstResourceName = "Concrete C20/25";

  before("register new account", () => {
    cy.visit("/auth/register");
    cy.get("input[name='name']").type(testerName);
    cy.get("input[name='email']").type(loginedMail);
    cy.get("input[name='password']").type(loginedPass);
    cy.get("input[name='confirmPassword']").type(loginedPass);
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
    cy.get("h1").contains(`Welcome back, ${testerName}`);
    cy.get("button").contains("Logout");
    cy.get("button").contains("Delete account");
    cy.get("h1").contains("Used resources");
    cy.get("select").contains(firstResourceName);
    cy.get("button").contains("Add & Calculate");
    cy.get("p").contains("Total result");
    cy.get("li").should("have.length", 2).contains("0 kg");
    cy.get("th")
      .should("have.length", 4)
      .each(($th, index) => {
        expect($th).contains(["Resource", "Quantity", "CO2", "SO2"][index]);
      });
  });
});
