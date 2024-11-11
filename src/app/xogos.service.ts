import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class XogosService {
  private API_KEY = ''; // Clave de la API
  private BASE_URL = 'https://api.rawg.io/api/games'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Metodo para obtener las opciones
  obtenerOpciones(): Observable<any> {
    const url = `${this.BASE_URL}?key=${this.API_KEY}`; // URL de la API
    return this.http
      .get<ApiResponse>(url) // Realiza una solicitud HTTP GET a la API
      .pipe(map((response) => response.results)); // Mapea la respuesta para obtener los resultados
  }

  // Metodo para buscar opciones
  buscarOpciones(query: string): Observable<any> {
    const url = `${this.BASE_URL}?search=${query}&key=${this.API_KEY}`; // URL de la API
    return this.http
      .get<ApiResponse>(url) // Realiza una solicitud HTTP GET a la API
      .pipe(map((response) => response.results)); // Mapea la respuesta para obtener los resultados
  }
}
//key=99da80d9f39f4b0d842ee3503541c2b3
