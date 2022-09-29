import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/app/models/book';

import { BookPageComponent } from './book-page.component';


@Component({selector: 'app-book-list',template: 'mock book list'})

class MockBookListComponent {
  @Input()books: Book[]= [];
}
@Component({selector: 'app-book-form',template: 'mock book form'})
class MockBookFormComponent{}




describe('BookPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;

  let addBookSpy: any;

  beforeEach(async () => {

      
const testBooks: Book[] =
[
   {title: 'The Hobbit',author: 'J R R Tolkien',cover: '',bookId: 1},
   {title: 'A Wizard of Earthsea',author: 'Ursula K Le Guin',cover: '',bookId: 2}
];

  // create fake bookService
  let bookService: any= jasmine.createSpyObj('BookService',['getBooks','addBook']);
  bookService.getBooks.and.returnValue(of(testBooks))

    await TestBed.configureTestingModule({
      declarations: [ BookPageComponent,
        MockBookListComponent,
        MockBookFormComponent, ],

        imports : [FormsModule],

        providers: [{ provide: BookService, useValue: bookService }]

       
    })
    .compileComponents();

    // call after compiled
    addBookSpy = bookService.addBook.and.callFake((param: any) => {return of(param);});


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //
  it('should pass books to the child component', () =>{
    const bookList = fixture.debugElement.query(By.css('app-book-list')).componentInstance;
    expect(bookList.books.length).toBe(2);
  });


    it('should add a book to the array', () =>{
      // const oldLength = component.books.length;
      component.addBook(new Book('The Lathe of Heaven','Ursula K Le Guin', '', 3));
      expect(addBookSpy).toHaveBeenCalled()
      // expect(component.books.length).toBe(oldLength + 1);
      // expect(component.books[oldLength].title).toBe('The Lathe of Heaven');
    });

    it('should retrieve books from the service', () =>{
        expect(component.books.length).toBe(2);
        expect(component.books[0].title).toBe('The Hobbit');
        expect(component.books[1].title).toBe('A Wizard of Earthsea');
     });
// testing err msg
it('should display an error message', () => {
    let errorDiv = fixture.debugElement.nativeElement.querySelector('.error'); 
    expect(errorDiv).toBeFalsy();
    component.errorMessage = 'An error'; 
    fixture.detectChanges(); 
    errorDiv = fixture.debugElement.nativeElement.querySelector('.error'); 
    expect(errorDiv).toBeTruthy(); 
  
  });

  
 });
