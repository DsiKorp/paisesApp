import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  hayError: boolean = false;

  constructor(private paisService: PaisService) {}

  getClaseCSS(region: string): string {
    return this.regionActiva === region
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva ) {
      return;
    }
    
    this.paises = [];
    console.log(`x region Buscar : `, region);
    this.hayError = false;
    this.regionActiva = region;

    this.paisService.buscarRegion(this.regionActiva).subscribe(
      (paises) => { // next
        console.log(`Por Region --> paises: `, paises);
        this.paises = paises;
      },
      (err) => {
        console.log('Error: ');
        console.info(err);
        this.hayError = true;
        this.paises = [];
      }
    );
  }
}
