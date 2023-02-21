describe('login-company-page', () => {
  beforeEach(() => cy.visit('/auth/company'));

  it('all entered correctly', () => {
    cy.get('[data-testid="companyID-input"]').type('test.com');
    cy.get('[data-testid="submit-button"]').click();
  });

  it('email entered incorrectly', () => {
    cy.get('[data-testid="companyID-input"]').type('test');
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });
});
