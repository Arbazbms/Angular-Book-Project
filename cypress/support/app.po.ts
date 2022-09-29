export default class AppPage
{ 
    navigate() { 
        cy.visit("/"); 
    }
    getTitle() { 
        return cy.get('app-root h1'); 
    } 
    clickAboutLink() { 
        cy.get('app-root nav a').contains('About').click(); 
    }
}