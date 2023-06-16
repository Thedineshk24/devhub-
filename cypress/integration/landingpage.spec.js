describe("it should visit landing page", () => {
  it("visit /", () => {
    cy.visit("/");
  });
});

// FIXME: below code is not working properlly for cypress
// describe("checking for heading", () => {
//   it("should find element by text content", () => {
//     cy.contains(/DevHub: connects developers with online events./).should('be.visible');
//   });
// });

describe("sign up should be visible", () => {
  it("should redirect to /login when clicking on sign up links", () => {
    cy.visit("/", { timeout: 10000 });
    cy.viewport(1280, 800);
  
    cy.get('a[href="/login"]').as("loginLinks").should("be.visible");
  
    cy.get("@loginLinks").each(($link, index) => {
      cy.visit("/", { timeout: 10000 }); // Visit the homepage before clicking each link
      cy.viewport(1280, 800);
      cy.get("@loginLinks").eq(index).click({ force: true }); // Click the specific link based on index
  
      cy.url().should("include", "/login"); // Verify the redirection to the login page
    });
  });  
});

describe("sign up should be visible on mobile", () => {
  it("should redirect to /login when clicking on sign up links on mobile", () => {
    cy.visit("/", { timeout: 10000 });
    cy.viewport("iphone-6");

    cy.get('a[href="/login"]').as("loginLinks").should("be.visible");

    cy.get("@loginLinks").each(($link, index) => {
      cy.visit("/", { timeout: 10000 }); // Visit the homepage before clicking each link
      cy.viewport("iphone-6");
      cy.get("@loginLinks").eq(index).click({ force: true }); // Click the specific link based on index

      cy.url().should("include", "/login"); // Verify the redirection to the login page
    });
  });
});


