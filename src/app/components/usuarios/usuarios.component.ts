import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Importa el componente de confirmación
import { User } from 'app/models/usuario';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Recargar la lista de usuarios después de crear uno nuevo
      }
    });
  }

  openEditDialog(usuario: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { usuario } // Pasa el usuario al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

  editUser(id: number): void {
    // Obtener el usuario por su ID
    const user = this.usuarios.find(u => u.id === id);
    if (user) {
      this.openEditDialog(user); // Pasar el usuario al diálogo de edición
    }
  }

  updateUser(id: number, userData: any): void {
    this.userService.updateUser(id, userData).subscribe(
      () => {
        console.log('Usuario actualizado correctamente.');
        this.loadUsers(); // Recargar la lista de usuarios después de editar uno
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.loadUsers(); // Recargar la lista de usuarios después de borrar uno
          },
          error => {
            console.error('Error al borrar el usuario:', error);
          }
        );
      }
    });
  }

}
