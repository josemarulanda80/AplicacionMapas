import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-75.36045801935903,5.97412344152482],
      zoom:16
    });
  }

}
