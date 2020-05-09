import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WeatherPage } from './weather.page';

import { WeatherPageRoutingModule } from './weather-routing.module';
import { TitleSectionModule } from 'src/app/components/title-section/title-section.module';
import { WeatherModule } from 'src/app/components/weather/weather.module';
import { FooterModule } from 'src/app/components/footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherPageRoutingModule,
    TitleSectionModule,
    WeatherModule,
    FooterModule
  ],
  declarations: [WeatherPage]
})
export class WeatherPageModule { }
