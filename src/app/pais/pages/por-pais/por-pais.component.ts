import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  termino           : string = '';
  hayError          : boolean = false;
  paises            : Country[] = [];
  paisesSugeridos   : Country[] = [];
  mostrarSugerencias :  boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string ) {
    console.log(`termino: `, this.termino);
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais( this.termino )
      .subscribe( (paises) => {   // next
        console.log(`Por Paises --> paises: `, paises);
        this.paises = paises;

      }, (err) => {
        console.log('Error: ');
        console.info(err);
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias( termino: string ) {
    console.log(`Sugerencias termino`, termino)
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
    .subscribe( paises => this.paisesSugeridos = paises.splice(0, 5),
    ( err ) => this.paisesSugeridos = [] );
    
  }

  buscarSugerido( termino: string ) {
    this.buscar( termino );
  }

}
