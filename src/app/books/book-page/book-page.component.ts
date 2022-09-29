import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  books: Book[] = [];
errorMessage: string = "";

  constructor(private bookService: BookService) { 

  }
  addBook(book:Book){
    this.bookService.addBook(book).subscribe(() => this.getBooks())
  }
  getBooks() { this.bookService.getBooks() 
    .subscribe({
       next : (data) => { this.books = data; this.errorMessage = '';},
       error: (e) => this.errorMessage = e
       });
  }
  ngOnInit(): void {
    this.getBooks()
  }

}
