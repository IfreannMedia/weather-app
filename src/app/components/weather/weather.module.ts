import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [WeatherComponent],
    exports: [WeatherComponent]
})

export class WeatherModule {

}