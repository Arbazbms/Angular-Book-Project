import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input()books: Book[]= [];
  trackBook(i: number, book: Book): number
  {
   return book.bookId;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
