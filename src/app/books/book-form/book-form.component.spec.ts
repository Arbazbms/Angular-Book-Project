import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from 'src/app/models/book';

import { BookFormComponent } from './book-form.component';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFormComponent,
       ],
       imports : [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //old
  // it('should emit an event on click', () =>
  // {
  //   spyOn(component.createBook, 'emit');
  //  const nativeElement = fixture.debugElement.nativeElement;
  //  const button = nativeElement.querySelector('button');
  //  button.dispatchEvent(new Event('click'));fixture.detectChanges();
  //  expect(component.createBook.emit).toHaveBeenCalled();});


  //formSubmit Testing
  it('should emit an event on click', () => {
     spyOn(component.createBook, 'emit');
     const expected = new Book('The Silmarillion', 'J R R Tolkien', '', -1); 
     const form = fixture.debugElement.nativeElement .querySelector('form'); 
     component.bookForm.get('title')?.setValue(expected.title); 
     component.bookForm.get('author')?.setValue(expected.author); 
     form.dispatchEvent(new Event('ngSubmit')); 
     expect(component.createBook.emit).toHaveBeenCalledWith(expected); 
  });



  // testing form validation reactive
  it('should validate the form required fiels -> form validation', ()=>{
    const titleControl = component.bookForm.get('title')
    const authorControl = component.bookForm.get('author');
    expect(component.bookForm.valid).toBeFalse();
    expect(titleControl?.hasError('required')).toBeTruthy();
    expect(authorControl?.hasError('required')).toBeTruthy();

    titleControl?.setValue('My Title');
    authorControl?.setValue('My Author')
    expect(component.bookForm.valid).toBeTruthy()


  })
})
