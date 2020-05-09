import { NgModule } from '@angular/core';
import { TitleSectionComponent } from './title-section.component';
import { IonicModule } from '@ionic/angular';
import { SearchbarWithDropdownModule } from '../searchbar-with-dropdown/searchbar-with-dropdown.module';

@NgModule({
    imports: [IonicModule, SearchbarWithDropdownModule],
    declarations: [TitleSectionComponent],
    exports: [TitleSectionComponent]
})

export class TitleSectionModule {

}