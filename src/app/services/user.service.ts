import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL } from '../utilities/config';
import { Usuario } from 'app/models/usuario';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}/users`);
  }

  createUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_URL}/users`, user);
  }

  updateUser(id: number, userData: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${API_URL}/users/${id}`, userData);
}


  deleteUser(id: number): Observable<Usuario> {
    const url = `${API_URL}/users/${id}`;
    return this.http.delete<Usuario>(url)
      .pipe(
        catchError(this.handleError<any>('deleteUser'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log del error en la consola

      // Puedes personalizar el mensaje de error según tus necesidades
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `Código de error: ${error.status}\nMensaje: ${error.message}`;

      // Puedes notificar el error al usuario o realizar cualquier acción adicional

      // Devuelve un observable con el resultado opcional para que la aplicación pueda continuar
      return throwError(result as T);
    };
  }

}
