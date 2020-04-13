import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})
export class TitleSectionComponent implements OnInit {

  constructor(private geoLocationService: GeolocationService) { }

  ngOnInit(): void {
    this.geoLocationService.getGeoLocation();
  }

}
