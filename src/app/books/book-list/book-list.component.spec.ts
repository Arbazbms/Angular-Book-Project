import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';

@Pipe({name:'noImage'})
class MockNoImagePipe implements PipeTransform{transform(value:string):string{return value;}}


describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListComponent, MockNoImagePipe ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



    it('should contain a table', () => {
      const compiled = fixture.debugElement.nativeElement;
      const table = compiled.querySelector('table');
      console.log(table);expect(table.rows.length).toBe(0);
      // expect(table.rows[0].cells[0].textContent).toBe('The Lord of the Rings')
    });

});
