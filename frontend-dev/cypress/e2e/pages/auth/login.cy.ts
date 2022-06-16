before('load variables', () => {
  cy.fixture('authentication').then(function (auth) {
    this.auth = auth;
  });
});

before('register new account and logout', function () {
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

describe('Login page', () => {
  beforeEach('visit login page', () => {
    cy.visit('/auth/login');

    cy.fixture('authentication').then(function (auth) {
      this.auth = auth;
    });
  });

  after('delete user account', () => {
    cy.get('button').contains('Delete account').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('should render all elements', () => {
    cy.get('h1').contains('Login');
    cy.get("input[name='email']").should('exist');
    cy.get("input[name='password']").should('exist');
    cy.get('button').contains('Login').should('exist');
    cy.get('p[class=invisible]').should('exist').should('have.length', 3);
    cy.get('p').contains('Create new account').should('exist');
    cy.get('p').contains('Back to home').should('exist');
  });

  it('should redirect to home page', () => {
    cy.get('p').contains('Back to home').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  });

  it('should redirect to register page', () => {
    cy.get('p').contains('Create new account').click();
    cy.url().should('include', '/auth/register');
  });

  it('should failed to submit with empty email', () => {
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('p[class=errors]').contains('Email is required');
    cy.get('p[class=errors]').contains('Password is required');
  });

  it('should failed to submit with wrong email', function () {
    cy.get("input[name='email']").type(this.auth.failedMail);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
  });

  it('should failed to submit with empty password', function () {
    cy.get("input[name='email']").type(this.auth.correctMail);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('p[class=errors]').contains('Password is required');
  });

  it('should failed with wrong password length', function () {
    cy.get("input[name='email']").type(this.auth.correctMail);
    cy.get("input[name='password']").type(this.auth.failedPass);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('p[class=errors]').contains(
      'Password must be at least 8 characters long'
    );
  });

  it('should failed to login with wrong registered information', function () {
    cy.get("input[name='email']").type(this.auth.correctMail);
    cy.get("input[name='password']").type(this.auth.correctPass);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('p[class=errors]').contains('User not found');
  });

  it('should failed with login with wrong password', function () {
    cy.get("input[name='email']").type(this.auth.loginedMail);
    cy.get("input[name='password']").type(this.auth.correctPass);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/auth/login');
    cy.get('p[class=errors]').contains('Password is not valid');
  });

  it('should login with correct user information', function () {
    cy.get("input[name='email']").type(this.auth.loginedMail);
    cy.get("input[name='password']").type(this.auth.loginedPass);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/users/');
  });
});

export {};
