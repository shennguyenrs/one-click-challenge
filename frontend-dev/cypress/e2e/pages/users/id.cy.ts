import { roundedToFourth } from '../../../../utils';

before('load variables', function () {
  cy.fixture('authentication').then(function (auth) {
    this.auth = auth;
  });

  cy.fixture('resources').then(function (resources) {
    this.resources = resources;
  });
});

before('register new account and log out', function () {
  cy.registerNew(
    this.auth.testerName,
    this.auth.loginedMail,
    this.auth.loginedPass
  );
  cy.get('button').contains('Logout').click();
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq('/');
  });
});

describe('User Page', () => {
  beforeEach('login exist account', function () {
    cy.loginExist(this.auth.loginedMail, this.auth.loginedPass);
  });

  after('delete user account', () => {
    cy.get('button').contains('Delete account').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('should render all elements', function () {
    cy.get('h1').contains(`Welcome back, ${this.auth.testerName}`);
    cy.get('button').contains('Logout');
    cy.get('button').contains('Delete account');
    cy.get('h1').contains('Used resources');
    cy.get('select').contains(this.resources.name);
    cy.get('button').contains('Add & Calculate');
    cy.get('p').contains('Total result');
    cy.get('li').should('have.length', 2).contains('0 kg');
    cy.get('th')
      .should('have.length', 4)
      .each(($th, index) => {
        expect($th).to.contain(['Resource', 'Quantity', 'CO2', 'SO2'][index]);
      });
  });

  it('should add new resouce correctly', () => {
    cy.get('button').contains('Add & Calculate').click();
    cy.get('li')
      .should('have.length', 2)
      .each(($li, index) => {
        cy.fixture('resources').then(function ({ impacts }) {
          expect($li).to.contain(
            [
              `CO2e: ${roundedToFourth(impacts[0].impactGWP100_kgCO2e)} kg`,
              `SO2e: ${roundedToFourth(impacts[0].impactAP_kgSO2e)} kg`,
            ][index]
          );
        });
      });
    cy.get('td')
      .should('have.length', 4)
      .each(($th, index) => {
        if ([0, 2, 3].includes(index)) {
          cy.fixture('resources').then(function ({ name, impacts }) {
            expect($th).to.contain(
              [
                name,
                '',
                `${roundedToFourth(impacts[0].impactGWP100_kgCO2e)}`,
                `${roundedToFourth(impacts[0].impactAP_kgSO2e)}`,
              ][index]
            );
          });
        }
      });
    cy.get('input[type=number]').should('have.value', 1);
  });

  it('should add quantity on the same resource name', () => {
    cy.get('button').contains('Add & Calculate').click();
    cy.get('li')
      .should('have.length', 2)
      .each(($li, index) => {
        cy.fixture('resources').then(function ({ impacts }) {
          expect($li).to.contain(
            [
              `CO2e: ${roundedToFourth(
                Number(impacts[0].impactGWP100_kgCO2e) * 2
              )} kg`,
              `SO2e: ${roundedToFourth(
                Number(impacts[0].impactAP_kgSO2e) * 2
              )} kg`,
            ][index]
          );
        });
      });
    cy.get('input[type=number]').should('have.value', 2);
    cy.get('td')
      .should('have.length', 4)
      .each(($th, index) => {
        if ([2, 3].includes(index)) {
          cy.fixture('resources').then(function ({ impacts }) {
            expect($th).to.contain(
              [
                '',
                '',
                `${roundedToFourth(
                  Number(impacts[0].impactGWP100_kgCO2e) * 2
                )}`,
                `${roundedToFourth(Number(impacts[0].impactAP_kgSO2e) * 2)}`,
              ][index]
            );
          });
        }
      });
  });

  it('should add quantity correctly on click arrow up', function () {
    cy.get('input[type=number]').type('{uparrow}').click();
    cy.get('input[type=number]').should('have.value', 3);
    // cy.get('li')
    //   .should('have.length', 2)
    //   .each(($li, index) => {
    //     cy.fixture('resources').then(function ({ impacts }) {
    //       expect($li).to.contain(
    //         [
    //           `CO2e: ${roundedToFourth(
    //             Number(impacts[0].impactGWP100_kgCO2e) * 3
    //           )} kg`,
    //           `SO2e: ${roundedToFourth(
    //             Number(impacts[0].impactAP_kgSO2e) * 3
    //           )} kg`,
    //         ][index]
    //       );
    //     });
    //   });
    // cy.get('td')
    //   .should('have.length', 4)
    //   .each(($th, index) => {
    //     if ([2, 3].includes(index)) {
    //       cy.fixture('resources').then(function ({ impacts }) {
    //         expect($th).to.contain(
    //           [
    //             '',
    //             '',
    //             `${roundedToFourth(
    //               Number(impacts[0].impactGWP100_kgCO2e) * 3
    //             )}`,
    //             `${roundedToFourth(Number(impacts[0].impactAP_kgSO2e) * 3)}`,
    //           ][index]
    //         );
    //       });
    //     }
    //   });
  });

  it('should add quantity correctly on click arrow down', function () {
    cy.get('input[type=number]').type('{downarrow}').click();
    cy.get('input[type=number]').should('have.value', 1);
    //   cy.get('li')
    //     .should('have.length', 2)
    //     .each(($li, index) => {
    //       cy.fixture('resources').then(function ({ impacts }) {
    //         expect($li).to.contain(
    //           [
    //             `CO2e: ${roundedToFourth(
    //               Number(impacts[0].impactGWP100_kgCO2e) * 2
    //             )} kg`,
    //             `SO2e: ${roundedToFourth(
    //               Number(impacts[0].impactAP_kgSO2e) * 2
    //             )} kg`,
    //           ][index]
    //         );
    //       });
    //     });
    //   cy.get('td')
    //     .should('have.length', 4)
    //     .each(($th, index) => {
    //       if ([2, 3].includes(index)) {
    //         cy.fixture('resources').then(function ({ impacts }) {
    //           expect($th).to.contain(
    //             [
    //               '',
    //               '',
    //               `${roundedToFourth(
    //                 Number(impacts[0].impactGWP100_kgCO2e) * 2
    //               )}`,
    //               `${roundedToFourth(Number(impacts[0].impactAP_kgSO2e) * 2)}`,
    //             ][index]
    //           );
    //         });
    //       }
    //     });
  });
});

export {};
