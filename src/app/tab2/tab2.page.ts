import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MovieService } from '../services/movie.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];

  constructor( private movieService: MovieService,
               private modalCtrl: ModalController) { }

  buscar( event: any ) {
    const valor: string = event.detail.value;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    // console.log(valor);
    this.buscando = true;

    this.movieService.buscarPeliculas( valor )
        .subscribe(( resp: any ) => {
          // console.log( resp );
          this.peliculas = resp['results'];
          this.buscando = false;
        });
  }

  async detalle( id: number ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
