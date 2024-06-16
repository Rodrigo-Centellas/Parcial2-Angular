import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModuloComponent } from './components/modulo/modulo.component';
import { ModuloService } from './services/modulo.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';


import { MatSelectModule } from '@angular/material/select';

import { CarreraComponent } from './components/carrera/carrera.component';
import { FacultadService } from './services/facultad.service';
import { CarreraService } from './services/carrera.service';
import { MateriaService } from './services/materia.service';
import { MateriaComponent } from './components/materia/materia.component';
import { MateriaDetallesComponent } from './components/materia-detalles/materia-detalles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AulaComponent } from './components/aula/aula.component';
import { AulaDialogComponent } from './components/aula-dialog/aula-dialog.component';
import { Grupo } from './models/grupo';
import { GrupoComponent } from './components/grupo/grupo.component';
import { GrupoDialogComponent } from './components/grupo-dialog/grupo-dialog.component';
import { SemestreDialogComponent } from './components/semestre-dialog/semestre-dialog.component';
import { SemestreComponent } from './components/semestre/semestre.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserModule,
    MatDialogModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UsuariosComponent,
    UserDialogComponent,
    GrupoComponent,
    GrupoDialogComponent,
    ModuloComponent,
    AulaComponent,
    AulaDialogComponent,
    CarreraComponent,
    MateriaComponent,
    MateriaDetallesComponent,
    ConfirmDialogComponent,
    SemestreDialogComponent,
    SemestreComponent,
  ],
  providers: [ModuloService,FacultadService,CarreraService,MateriaComponent,
    LicenciaComponent,ClaseComponent,AsignarClaseComponent,AulaClaseComponent,HorarioClaseComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
