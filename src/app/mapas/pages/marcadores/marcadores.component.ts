import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker
  centro?: [number, number]
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-75.36045801935903, 5.97412344152482]
  // Arreglo de marcadores
  marcadores: MarcadorColor[] = []
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    //7/   const maker= new mapboxgl.Marker().
    // setLngLat(this.center)
    //.addTo(this.mapa)
    this.leerLocalStorage();
  }
  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)
    this.marcadores.push({ color, marker: nuevoMarcador });
    this.guardarMarcadorLocalStorage();
    nuevoMarcador.on('dragend',()=>{
      this.guardarMarcadorLocalStorage()
    })
  }
  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker!.getLngLat()
    })
    this.mapa.flyTo({
      center: this.center
    })
  }
  guardarMarcadorLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];
    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    })
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }
  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m=>{
    const newMarker = new mapboxgl.Marker({
      color:m.color,
      draggable:true
    })
    .setLngLat(m.centro!)
    .addTo(this.mapa);
    this.marcadores.push({
      marker:newMarker,
      color:m.color

    });
    newMarker.on('dragend',()=>{
      this.guardarMarcadorLocalStorage()
    });
    })
  }
  borrarMarcador(i:number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadorLocalStorage
  }
}
