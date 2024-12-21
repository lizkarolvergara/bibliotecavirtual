import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  private apiUrl = 'https://biblioteca-b4aed-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  listarLibros() {
    return this.http.get(`${this.apiUrl}/libros.json`).pipe(
      map((resp: any) => {
        const res: any[] = [];
        Object.keys(resp || {}).forEach((key) => {
          const libro: any = resp[key];
          libro.id = key;
          res.push(libro);
        });
        return res;
      })
    );
  }

  agregarLibro(libro: any) {
    return this.http.post(`${this.apiUrl}/libros.json`, libro);
  }

  editarLibro(libro: any) {
    return this.http.put(`${this.apiUrl}/libros/${libro.id}.json`, libro);
  }

  eliminarLibro(id: string) {
    return this.http.delete(`${this.apiUrl}/libros/${id}.json`);
  }

  listarAutores() {
    return this.http.get(`${this.apiUrl}/autores.json`).pipe(
      map((resp: any) => {
        const res: any[] = [];
        Object.keys(resp || {}).forEach((key) => {
          const autor: any = resp[key];
          autor.id = key;
          res.push(autor);
        });
        return res;
      })
    );
  }

  agregarAutor(autor: any) {
    return this.http.post(`${this.apiUrl}/autores.json`, autor);
  }

  eliminarAutor(id: string) {
    return this.http.delete(`${this.apiUrl}/autores/${id}.json`);
  }
}
