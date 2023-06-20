describe('Navigation', () => {
    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/');

        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href="/swr/first-swr"]').click();

        // The new url should include "/about"
        cy.url().should('include', '/swr/first-swr');

        // The new page should contain an h1 with "About page"
        cy.get('h3').contains('SWR fetch data');

        cy.intercept({
                    method: "GET",
                    url: "/api/slow-auth",
                }).as("authData");

        cy.intercept({
                method: "GET",
                url: "/api/invoice/**",
            }).as("invoiceData");        

        // -------- login
        cy.get('button:contains("SWR Login")').click();

        cy.wait("@authData").its('response.statusCode').should('eq', 200);

        cy.wait("@invoiceData").its('response.statusCode').should('eq', 200);
        
        cy.get('div').contains('Data from SWR');

        cy.wait(3000);

        //------- logout
        cy.get('button:contains("Logout")').click();

        cy.get('span:contains("Not Access")');

        cy.wait(3000);

        // -------- login again
        cy.get('button:contains("SWR Login")').click();

        cy.wait("@authData").its('response.statusCode').should('eq', 200);

        cy.wait("@invoiceData").its('response.statusCode').should('eq', 200);
        
        cy.get('div').contains('Data from SWR');

    })
})