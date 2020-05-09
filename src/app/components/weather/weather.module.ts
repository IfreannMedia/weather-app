import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [IonicModule],
    declarations: [WeatherComponent],
    exports: [WeatherComponent]
})

export class WeatherModule {

}