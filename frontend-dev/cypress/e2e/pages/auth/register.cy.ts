before('load variables', () => {
  cy.fixture('authentication').then(function (auth) {
    this.auth = auth;
  });
});

describe('Register page', () => {
  context('user does not have an account', () => {
    beforeEach('visit register address', () => {
      cy.visit('/auth/register');
    });

    after('delete account', () => {
      cy.get('button').contains('Delete account').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('should render all elements', () => {
      cy.get('h1').contains('Create new account');
      cy.get("input[name='name']").should('exist');
      cy.get("input[name='email']").should('exist');
      cy.get("input[name='password']").should('exist');
      cy.get("input[name='confirmPassword']").should('exist');
      cy.get('button').contains('Register').should('exist');
      cy.get('p[class=invisible]').should('exist').should('have.length', 5);
      cy.get('p').contains('Login').should('exist');
      cy.get('p').contains('Back to home').should('exist');
    });

    it('should redirect to home page', () => {
      cy.get('p').contains('Back to home').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('should redirect to login page', () => {
      cy.get('p').contains('Login').click();
      cy.url().should('include', '/auth/login');
    });

    it('should failed to submit with empty fields', () => {
      cy.get('button').contains('Register').click();
      cy.url().should('include', '/auth/register');
      cy.get('p[class=errors]').contains('Name is required');
      cy.get('p[class=errors]').contains('Email is required');
      cy.get('p[class=errors]').contains('Password is required');
      cy.get('p[class=errors]').contains('Confirm password is required');
    });

    it('should failed to submit with invalid email', function () {
      cy.get("input[name='name']").type(this.auth.testerName);
      cy.get("input[name='email']").type(this.auth.failedMail);
      cy.get('button').contains('Register').click();
      cy.url().should('include', '/auth/register');
    });

    it('should failed to submit with invalid password', function () {
      cy.get("input[name='name']").type(this.auth.testerName);
      cy.get("input[name='email']").type(this.auth.correctMail);
      cy.get("input[name='password']").type(this.auth.failedPass);
      cy.get('button').contains('Register').click();
      cy.url().should('include', '/auth/register');
      cy.get('p[class=errors]').contains(
        'Password must be at least 6 characters'
      );
      cy.get('p[class=errors]').contains('Passwords must match');
    });

    it('should failed to submit with invalid confirm password', function () {
      cy.get("input[name='name']").type(this.auth.testerName);
      cy.get("input[name='email']").type(this.auth.correctMail);
      cy.get("input[name='password']").type(this.auth.correctPass);
      cy.get("input[name='confirmPassword']").type(this.auth.failedPass);
      cy.get('button').contains('Register').click();
      cy.url().should('include', '/auth/register');
      cy.get('p[class=errors]').contains('Passwords must match');
    });

    it('should success to register with valid email and password', function () {
      cy.get("input[name='name']").type(this.auth.testerName);
      cy.get("input[name='email']").type(this.auth.correctMail);
      cy.get("input[name='password']").type(this.auth.correctPass);
      cy.get("input[name='confirmPassword']").type(this.auth.correctPass);
      cy.get('button').contains('Register').click();
      cy.url().should('include', '/users/');
    });
  });

  context('user have exists account', () => {
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

    beforeEach('visit register address', () => {
      cy.visit('/auth/register');
    });

    after('delete account', function () {
      cy.visit('/auth/login');
      cy.get("input[name='email']").type(this.auth.loginedMail);
      cy.get("input[name='password']").type(this.auth.loginedPass);
      cy.get('button').contains('Login').click();
      cy.url().should('include', '/users/');
      cy.get('button').contains('Delete account').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('should failed to register with valid email and password', function () {
      cy.get("input[name='name']").type(this.auth.testerName);
      cy.get("input[name='email']").type(this.auth.loginedMail);
      cy.get("input[name='password']").type(this.auth.correctPass);
      cy.get("input[name='confirmPassword']").type(this.auth.correctPass);
      cy.get('button').contains('Register').click();
      cy.url().should('include', '/auth/register');
      cy.get('p[class=errors]').contains('User exists');
    });
  });
});

export {};
