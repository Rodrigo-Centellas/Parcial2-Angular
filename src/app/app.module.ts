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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { ModuloService } from './services/modulo.service';

import { CarreraComponent } from './components/carrera/carrera.component';
import { FacultadService } from './services/facultad.service';
import { CarreraService } from './services/carrera.service';
import { MateriaService } from './services/materia.service';
import { MateriaComponent } from './components/materia/materia.component';
import { MateriaDetallesComponent } from './components/materia-detalles/materia-detalles.component';
import { LicenciaComponent } from './components/licencia/licencia.component';
import { DetalleLicenciaComponent } from './components/detalle-licencia/detalle-licencia.component';
import { LicenciaService } from './services/licencia.service';
import { ClaseComponent } from './components/clase/clase.component';
import { AsignarClaseComponent } from './components/asignar-clase/asignar-clase.component';
import { AulaClaseComponent } from './components/aula-clase/aula-clase.component';
import { HorarioClaseComponent } from './components/horario-clase/horario-clase.component';

@NgModule({
  imports: [
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
    MatFormFieldModule,
    BrowserModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    // UsuariosComponent,s
    ModuloComponent,
    CarreraComponent,
    MateriaComponent,
    MateriaDetallesComponent,
    LicenciaComponent,
    DetalleLicenciaComponent,
    ClaseComponent,
    AsignarClaseComponent,
    HorarioClaseComponent,
    AulaClaseComponent
  ],
  providers: [ModuloService,FacultadService,CarreraService,MateriaComponent,
    LicenciaComponent,ClaseComponent,AsignarClaseComponent,AulaClaseComponent,HorarioClaseComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
