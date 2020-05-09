import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchbarWithDropdownComponent } from './searchbar-with-dropdown.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [SearchbarWithDropdownComponent],
    exports: [SearchbarWithDropdownComponent],
    providers: [],
    entryComponents: []
})

export class SearchbarWithDropdownModule {

}