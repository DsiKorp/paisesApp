import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  // se emite en el buscar cuando se le da enter
  @Output() onEnter   : EventEmitter<string> = new EventEmitter(); 

  // Se emite cuando la persona deja de escribir
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); 

  @Input() placeholder: string = '';

  // Crea un observable rxjs manualmente para cuando dejo de escribir
  debouncer: Subject<string> = new Subject();
  
  termino: string = '';

  ngOnInit(): void {
    this.debouncer
    // Mientras deje de escribir por 300 ms se dispara el subscribe
    .pipe( debounceTime(300))
    .subscribe( valor => {
      console.log('ngOnInit debouncer valor:  ', valor);
      //this.onDebounce.emit( this.termino );
      this.onDebounce.emit( valor );
    });
  }
  
  // Se dispara cuando le doy enter en el html
  buscar() {
    console.log('Emitiendo: ', this.termino);
    this.onEnter.emit( this.termino );
  }

  // (input)="teclaPresionada()" en el html
  //teclaPresionada( event: any ) {
  teclaPresionada() {
    //const valor = event.target.value;
    //console.log(`valor: `, valor);
    //console.log(`teclaPresionada this.termino: `, this.termino);
    this.debouncer.next( this.termino );

  }

}
