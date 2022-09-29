export default class AboutPage { 
    getAboutContent() {
         return cy.get('app-about-page p').should('contain', 'about-page works!');
    }
 }