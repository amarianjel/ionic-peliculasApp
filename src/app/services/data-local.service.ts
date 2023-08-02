import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  private databaseCreated = false;

  constructor( private storage: Storage, private toastCtrl: ToastController ) {
    this.initDatabase();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {
    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast( mensaje );
    this.storage.set('peliculas', this.peliculas );

    return !existe;
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];

    return this.peliculas;
  }

  async existePelicula( id: any ) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }

  // README: Solución a problema de cargaFavorito() en el constructor
  async initDatabase() {
    await this.storage.create();
    this.databaseCreated = true;
    await this.cargarFavoritos();
  }
}
