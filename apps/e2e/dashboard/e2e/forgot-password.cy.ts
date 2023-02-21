describe('forgot-password-page', () => {
  beforeEach(() => cy.visit('/auth/forgot'));

  it('all entered correctly', () => {
    cy.get('[data-testid="forgot-email-input"]').type('forgottest@gmail.com');
    cy.get('[data-testid="submit-button"]').click();
  });

  it('email entered incorrectly', () => {
    cy.get('[data-testid="forgot-email-input"]').type('forgottest');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('email entered incorrectly', () => {
    cy.get('[data-testid="forgot-email-input"]').type('forgottest@f');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('email entered incorrectly', () => {
    cy.get('[data-testid="forgot-email-input"]').type('forgottest@f.');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });
});
