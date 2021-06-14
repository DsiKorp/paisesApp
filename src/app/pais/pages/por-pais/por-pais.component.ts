import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];

  constructor( private paisService: PaisService ) { }

  buscar() {
    console.log(`termino: `, this.termino);
    this.hayError = false;

    this.paisService.buscarPais( this.termino )
      .subscribe( (paises) => {   // next
        console.log(`paises: `, paises);
        this.paises = paises;

      }, (err) => {
        console.log('Error: ');
        console.info(err);
        this.hayError = true;
        this.paises = [];
      });
  }

}
