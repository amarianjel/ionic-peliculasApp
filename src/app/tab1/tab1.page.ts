import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor( private movieService: MovieService ) {}

  ngOnInit(){
    this.movieService.getFeature().subscribe( resp => {
      this.peliculasRecientes = resp.results;
    })

    this.getPopulares();
  }

  getPopulares() {
    this.movieService.getPopulares()
    .subscribe( resp => {
      // console.log('Populares', resp.results);
      const arrTemp = [ ...this.populares, ...resp.results ];
      this.populares = arrTemp;
      
    });

  }
  
  cargarMas() {
    this.getPopulares();
  }
}
