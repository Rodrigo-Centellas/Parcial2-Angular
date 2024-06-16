import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_URL_API } from '../utilities/config';
import { User } from 'app/models/usuario';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL_API}/users`, this.authService.getHeaders());
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL_API}/users`, user, this.authService.getHeaders());
  }

  updateUser(id: number, userData: User): Observable<User> {
    return this.http.put<User>(`${API_URL_API}/users/${id}`, userData, this.authService.getHeaders());
}


  deleteUser(id: number): Observable<User> {
    const url = `${API_URL_API}/users/${id}`;
    return this.http.delete<User>(url, this.authService.getHeaders())
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
