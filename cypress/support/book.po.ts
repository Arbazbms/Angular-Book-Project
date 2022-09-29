export class BookPage { 
    addTitle(title:string) { 
        cy.get('app-book-form input#title').type(title);
     } 
     addAuthor(name:string) { 
        cy.get('app-book-form input#author').type(name); 
    } 
    clickAddBook() { 
        return cy.get('button').contains('Add Book', {timeout: 15000}).click(); 
    } 
    checkAddButtonDisabled() { 
        cy.get('button').contains('Add Book').should('be.disabled'); 
    } 
    checkAddButtonEnabled() { 
        cy.get('button').contains('Add Book').should('not.be.disabled'); 
    } 
}