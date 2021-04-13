import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'category-card',
  templateUrl: './categorycard.component.html',
  styleUrls: ['./categorycard.component.css']
})
export class CategorycardComponent implements OnInit {

  @Input() categories: any;
  constructor() { }

  ngOnInit() {
    this.categories.forEach(el => {
      let url = "http://localhost:5000/Images/"+el.imageUrl;
      el.imageUrl = url;
    });
  }

}
