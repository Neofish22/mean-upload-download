import { Component, OnInit } from '@angular/core'

//
@Component({
  selector: 'mud-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  // Reduce repetition in the HTML by specifying things here.
  adminPages = [
    { text: 'Media', url: 'media' }
  ]

  // Construct.
  constructor() { }

  // Init.
  ngOnInit() {
  }

}
