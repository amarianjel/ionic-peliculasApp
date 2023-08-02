import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor( private movieService: MovieService,
               private modalCtrl: ModalController,
                ) { }

  ngOnInit() {
    // console.log('ID', this.id );

    // this.dataLocal.existePelicula( this.id )
    //   .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );


    this.movieService.getPeliculaDetalle( this.id )
        .subscribe( resp => {
          // console.log( resp );
          this.pelicula = resp;
        });

    this.movieService.getActoresPelicula( this.id )
        .subscribe( resp => {
          // console.log( resp );
          this.actores = resp.cast;
        });

  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  // favorito() {
  //   const existe = this.dataLocal.guardarPelicula( this.pelicula );
  //   this.estrella = ( existe ) ? 'star' : 'star-outline';
  // }

}
