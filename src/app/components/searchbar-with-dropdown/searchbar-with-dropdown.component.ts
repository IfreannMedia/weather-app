import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar-with-dropdown',
  templateUrl: './searchbar-with-dropdown.component.html',
  styleUrls: ['./searchbar-with-dropdown.component.scss'],
})
export class SearchbarWithDropdownComponent implements OnInit {


  public showList: boolean = false;

  constructor() { }

  ngOnInit() { }


  public searchGotFocused() {
    this.showList = true;
  }

  public searchGotBlurred() {
    this.showList = false;
  }
}
