import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {

  bookId:number = -1;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id']
  }

}
