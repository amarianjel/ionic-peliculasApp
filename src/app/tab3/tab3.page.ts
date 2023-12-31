import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { DataLocalService } from '../services/data-local.service';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor( private dataLocal: DataLocalService,
                private movieService: MovieService  ) { }


  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.movieService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas );
  }


  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]  ) {
    this.favoritoGenero = [];

    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres?.find( genre => genre.id === genero.id );
        })
      });
    });

    //console.log(this.favoritoGenero);
  }
}
