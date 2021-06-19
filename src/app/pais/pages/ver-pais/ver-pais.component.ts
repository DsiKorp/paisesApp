import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  // ! para no inicializar la variable y que no saque error.
  pais!: Country;

  // ActivatedRoute para poder subscribirnos a caulquier cambio de la url
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe( 
      // switchMap rxjs para evitar el doble subscribe: Permite recibir un observable y retornar otro observable
      switchMap( ( param ) => this.paisService.buscarPaisCode( param.id )),
      // tap: operador que dispara un efecto secundario 
      tap( console.log )
     )
    .subscribe( pais => {
      this.pais = pais;
      console.log(`1. pais`, pais);
    })
  }

  ngOnInit2(): void {
    // acceso al observable que tiene los parámetros.
    this.activatedRoute.params
      // ({ id }) destructuración de params de lo que retorna, el nombre id está definido en la app-routing.module.ts
      .subscribe(({ id }) => {
        //  .subscribe( params => {     params.id
        console.log(`id`, id);

        this.paisService.buscarPaisCode(id)
        .subscribe( pais => {
          console.log(`X code pais`, pais)
        });
      });
  }
}
