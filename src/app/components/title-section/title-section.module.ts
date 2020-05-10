import { NgModule } from '@angular/core';
import { TitleSectionComponent } from './title-section.component';
import { IonicModule } from '@ionic/angular';
import { SearchbarWithDropdownModule } from '../searchbar-with-dropdown/searchbar-with-dropdown.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, SearchbarWithDropdownModule, CommonModule],
    declarations: [TitleSectionComponent],
    exports: [TitleSectionComponent]
})

export class TitleSectionModule {

}