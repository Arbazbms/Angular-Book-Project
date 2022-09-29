import { Inject } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { BookService } from './book.service';
import { Book } from './models/book';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { HttpErrorResponse } from '@angular/common/http';


describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;
// testbooks


  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ HttpClientTestingModule ] });
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });





    it('should return books', inject([BookService], fakeAsync((service: BookService) => { 
      let books: Book[] = []; 
      let testBooks:Book[]=[
        {"author":"Gamma, Helm, Johnson, Vlissides","bookId":4,"cover":"","title":"Design Patterns"},
        {"author":"Martin Fowler","bookId":3,"cover":"","title":"UML Distilled"}
      ]
      service.getBooks() .subscribe(data => books = data); 
      const req = httpTestingController.expectOne( 'http://localhost:8080/BookService/jaxrs/books'); 
      // Assert that the request is a GET.
       expect(req.request.method).toEqual('GET');
        // Respond with mock data, causing Observable to resolve. 
        req.flush(testBooks); 
        // Assert that there are no outstanding requests.
         httpTestingController.verify(); 
         // Cause all Observables to complete and check the results
          tick(); 
          expect(books[0].title).toBe('Design Patterns'); })));



          it('should POST to add a book', inject([BookService], fakeAsync((service: BookService) => { 
            const expected = new Book('A Wizard of EarthSea', 'Ursula K Le Guin', '', 3);
             service.addBook(expected) .subscribe(); 
             const req = httpTestingController.expectOne( 'http://localhost:8080/BookService/jaxrs/books'); 
             // Assert that the request is a POST.
              expect(req.request.method).toEqual('POST'); 
              // Assert that it was called with the right data 
              expect(req.request.body).toBe(expected); 
              // Respond with empty data. 
              req.flush(null);
               // Assert that there are no outstanding requests.
                httpTestingController.verify(); tick(); 
              
          })));



      // Testing Err handling from service.ts file
      it('should handle a 404 error or price', inject([BookService], fakeAsync((service: BookService) => { 
        let errorResp: HttpErrorResponse;
        let errorReply: string = ''; 
        const errorHandlerSpy = spyOn(service, 'handleError').and.callThrough();
        service.getBooks().subscribe({next: () => fail('Should not succeed'), error: (e) => errorReply = e});
        const req = httpTestingController.expectOne(service.url); 
        // Assert that the request is a GET.
         expect(req.request.method).toEqual('GET');
        // Respond with error
        req.flush('Forced 404', { status: 404, statusText: 'Not Found' }); 
        // Assert that there are no outstanding requests.
        httpTestingController.verify(); // Cause all Observables to complete and check the results 
        tick(); 
        expect(errorReply).toBe( 'Unable to contact service; please try again later.');
        expect(errorHandlerSpy).toHaveBeenCalled(); 
        errorResp = errorHandlerSpy.calls.argsFor(0)[0];
        expect(errorResp.status).toBe(404); 
            
        })));

});
