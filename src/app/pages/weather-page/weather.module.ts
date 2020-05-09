import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WeatherPage } from './weather.page';

import { WeatherPageRoutingModule } from './weather-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherPageRoutingModule
  ],
  declarations: [WeatherPage]
})
export class WeatherPageModule {}
