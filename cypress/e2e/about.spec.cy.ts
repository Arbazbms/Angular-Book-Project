import AboutPage from "cypress/support/about.po";
import AppPage from "cypress/support/app.po";

let app: AppPage; 
let about : AboutPage; 

beforeEach(() => { 
    app = new AppPage(); 
    about = new AboutPage(); 
});

it('should navigate to about page', () => { 
    cy.visit('/'); 
    // get the link to the About page and click it 
    app.clickAboutLink()
    //check the content of the about page 
    about.getAboutContent()
});