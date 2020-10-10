import { ISearchableEntry } from './../../interfaces/ISearchableEntry.interface';
import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-searchbar-with-dropdown',
  templateUrl: './searchbar-with-dropdown.component.html',
  styleUrls: ['./searchbar-with-dropdown.component.scss'],
})
export class SearchbarWithDropdownComponent {

  @ViewChild(IonSearchbar, null) private ionSearchbar: IonSearchbar = undefined;
  @ViewChild('dropdown', null) private dropdown: ElementRef = undefined;
  @Input() public disabled = false;
  @Input() public set entries(entries: ISearchableEntry[]) {
    this.filteredEntries = entries;
    this._entries = entries;
  }

  public valueText: string = undefined;

  public filteredEntries: ISearchableEntry[] = [];

  public get entries(): ISearchableEntry[] {
    return this._entries;
  }

  @Output() public selection: EventEmitter<ISearchableEntry> = new EventEmitter<ISearchableEntry>();
  public showList = false;

  private _entries: ISearchableEntry[] = [];

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeDropdown();
  }

  public searchGotFocused() {
    this.showList = true;
    this.resizeDropdown();
  }

  public searchGotBlurred() {
    // timeout to allow for list selection, then hide the list div
    window.setTimeout(() => {
      this.showList = false;
    }, 200)
  }

  public searthTermChanged(searthTerm: string) {
    if (searthTerm) {
      this.filteredEntries = this.entries.filter(ent => ent.getComparer().toLowerCase().includes(searthTerm.toLowerCase()));
    }
    else {
      this.filteredEntries = this.entries;
    }
  }

  public selectEntry(entry: ISearchableEntry) {
    this.valueText = entry.getDisplayName();
    this.selection.emit(entry);
  }

  private resizeDropdown() {
    if (this.dropdown && this.ionSearchbar && this.showList) {
      this.ionSearchbar.getInputElement().then((el: HTMLInputElement) => {
        this.dropdown.nativeElement.style.width = el.offsetWidth + 19 + 'px'; // width of input plus 19px
      })
    }
  }
}
