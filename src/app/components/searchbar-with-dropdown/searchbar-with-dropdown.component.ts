import { CountryComplete } from 'src/app/classes/country-complete';
import { Component, OnInit, Input } from '@angular/core';
import CountryData from 'node_modules/countries-list/dist/index';
import { count } from 'rxjs/operators';

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
  public Countries: any = undefined;
  constructor() { }

  ngOnInit() {
    this.Countries = CountryData;
  }


  public searchGotFocused() {
    this.showList = true;
  }

  public searchGotBlurred() {
    this.showList = false;
  }

  public searthTermChanged(searthTerm: string) {
    this.searchTerm = searthTerm;
    this.filterEntries()
  }

  private filterEntries() {
    this.filteredEntries = [];
    this.filteredEntries = this.entries.filter((country: CountryComplete) => {
      return country.cities.filter(c => c.name.toLowerCase().includes(this.searchTerm.toLowerCase())).length > 0
        || country.country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || country.country.native.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
