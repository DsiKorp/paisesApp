import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];

  constructor(private paisService: PaisService ) { }

  buscar( termino: string ) {
    console.log(`x Ciudad Buscar termino: `, this.termino);
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital( this.termino )
      .subscribe( (paises) => {   // next
        console.log(`Por Capitales --> paises: `, paises);
        this.paises = paises;

      }, (err) => {
        console.log('Error: ');
        console.info(err);
        this.hayError = true;
        this.paises = [];
      });
  }

}
