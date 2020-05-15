import { CountryComplete } from 'src/app/classes/country-complete';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar-with-dropdown',
  templateUrl: './searchbar-with-dropdown.component.html',
  styleUrls: ['./searchbar-with-dropdown.component.scss'],
})
export class SearchbarWithDropdownComponent implements OnInit {

  @Input() public entries: CountryComplete[] = [];
  public filteredEntries: CountryComplete[] = [];
  public showList: boolean = false;
  public searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }


  public searchGotFocused() {
    this.showList = true;
  }

  public searchGotBlurred() {
    this.showList = false;
  }

  public searthTermChanged(searthTerm: string) {
    this.searchTerm = searthTerm;
  }

  private filterEntries() {
    // this.filterEntries = this.entries.filter(val => val.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
