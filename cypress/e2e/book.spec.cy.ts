import AppPage from 'cypress/support/app.po';
import { BookPage } from 'cypress/support/book.po';
import { v4 as uuid } from 'uuid';
describe('', ()=>{
    let book:BookPage
    let app:AppPage

    beforeEach(() => { 
        book = new BookPage(); 
        app = new AppPage();
    });
    

    it('should add a book', () => { 
        const title = uuid();
         app.navigate(); 
         cy.contains(title).should('not.exist');
         book.checkAddButtonDisabled(); 
         book.addAuthor('William Gibson'); 
         book.addTitle(title);
         book.checkAddButtonEnabled(); 
         book.clickAddBook(); 
         cy.contains(title).should('exist');
    });
})
