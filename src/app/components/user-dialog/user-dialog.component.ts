import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Usuario } from 'app/models/usuario';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario }
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    // Inicializar el formulario y establecer los valores predeterminados según el modo (crear o editar)
    this.userForm = this.formBuilder.group({
      name: [this.data?.usuario?.name || '', Validators.required],
      email: [this.data?.usuario?.email || '', [Validators.required, Validators.email]],
      password: [this.data?.usuario?.password || '', Validators.required],
      rol: [this.data?.usuario?.rol || '', Validators.required],
      ci: [this.data?.usuario?.ci || '', Validators.required],
      direccion: [this.data?.usuario?.direccion || '', Validators.required]
    });
  }
  onSave(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.data && this.data.usuario) {
        // Si existe data.usuario, significa que estamos editando un usuario existente
        this.updateUser(userData);
      } else {
        // Si no existe data.usuario, significa que estamos creando un nuevo usuario
        this.createUser(userData);
      }
    }
  }

  private createUser(userData: Usuario): void {
    this.userService.createUser(userData).subscribe(
      response => {
        this.dialogRef.close(response); // Cerrar el diálogo y devolver la respuesta
      },
      error => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }

  private updateUser(userData: Usuario): void {
    const userId = this.data.usuario.id;
    this.userService.updateUser(userId, userData).subscribe(
      () => {
        console.log('Usuario actualizado correctamente.');
        this.dialogRef.close();
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
