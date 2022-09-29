import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book('Rich Dad poor dad', 'Robert', 'Thinking', 4564)).toBeTruthy();
  });
});
