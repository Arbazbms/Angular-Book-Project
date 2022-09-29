import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Output()createBook = new EventEmitter<Book>();
  // book: Book = new Book ('', '', '', -1);

  bookForm: FormGroup = new FormGroup({});


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
       title: ['', Validators.required], 
       author: ['', Validators.required] });
  }
  // add() {
  //   console.log(this.book);
  //   this.createBook.emit(this.book)
  //   this.book = new Book('', '', '', -1)
  // }

  // new add
  add() { 
    this.createBook.emit( 
      new Book( 
        this.bookForm.get('title')?.value, 
        this.bookForm.get('author')?.value, '', -1 
      )); 
      this.bookForm.reset(); }

}
