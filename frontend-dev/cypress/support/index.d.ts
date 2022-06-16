declare namespace Cypress {
  interface Chainable {
    registerNew(name: string, email: string, password: string): Chainable<void>;
    loginExist(email: string, password: string): Chainable<void>;
  }
}
