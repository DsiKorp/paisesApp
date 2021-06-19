import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  get httpParams(): HttpParams {
    return new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population'); 
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${termino}`;
    console.log(`url`, url);
    return this.http.get<Country[]>(url, { params: this.httpParams });
          // of genera un observable
          //  .pipe(
          //   catchError( err => of([]))
          //  );
  }

  buscarCapital( termino: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${termino}`;
    console.log(`url`, url);
    return this.http.get<Country[]>(url, { params: this.httpParams });
          // of genera un observable
          //  .pipe(
          //   catchError( err => of([]))
          //  );
  }

  buscarPaisCode( id: string ): Observable<Country> {

    const url = `${this.apiUrl}/alpha/${id}`;
    console.log(`url`, url);
    return this.http.get<Country>(url);
          // of genera un observable
          //  .pipe(
          //   catchError( err => of([]))
          //  );
  }

  buscarRegion( region: string ): Observable<Country[]> {




    const url = `${this.apiUrl}/region/${region}`;
    console.log(`url`, url);
    return this.http.get<Country[]>(url, { params: this.httpParams }) // { especifica un obj }
        .pipe(
          tap( console.log )
        );
          // of genera un observable
          //  .pipe(
          //   catchError( err => of([]))
          //  );
  }


}
