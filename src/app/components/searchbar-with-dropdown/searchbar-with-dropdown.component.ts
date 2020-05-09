import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar-with-dropdown',
  templateUrl: './searchbar-with-dropdown.component.html',
  styleUrls: ['./searchbar-with-dropdown.component.scss'],
})
export class SearchbarWithDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit() { }


  public searchGotFocused() {
    // TODO make searchable list appear
  }
}
