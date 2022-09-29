import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       // A client-side or network error occurred. Handle it.
        console.error('An error occurred:', error.error.message);
      } else {
     // The backend returned an unsuccessful response code.
      // The response body may contain clues
      
      console.error( `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    
     } // return an observable with a user-facing error message
     return throwError(() => 'Unable to contact service; please try again later.'); 
    
    };
  // books: Book[] = [
  //   {title: 'The Lord of the Rings',author: 'J R R Tolkien',cover: '',bookId: 1},
  //    {title: 'The Left Hand of Darkness',author: 'Ursula K Le Guin',cover: '',bookId: 2}
  // ];
 public url:string = 'http://localhost:8080/BookService/jaxrs/books'

  constructor(private http: HttpClient ) { }

  getBooks(): Observable<Book[]> {
     return this.http.get<Book[]>(this.url).pipe(catchError(this.handleError));
  }

  addBook(book: Book): Observable<Book> { 
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
     return this.http.post<Book>(this.url, book, { headers: headers }); 
    }
}
