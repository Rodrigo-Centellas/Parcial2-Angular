import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';  // Asegúrate de que la ruta sea correcta
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModuloComponent } from './components/modulo/modulo.component'; // Importar el nuevo componente
import { CarreraComponent } from './components/carrera/carrera.component';
import { FacultadComponent } from './components/facultad/facultad.component';
import { MateriaComponent } from './components/materia/materia.component';
import { MateriaDetallesComponent } from './components/materia-detalles/materia-detalles.component';
import { LicenciaComponent } from './components/licencia/licencia.component';
import { DetalleLicenciaComponent } from './components/detalle-licencia/detalle-licencia.component';
import { ClaseComponent } from './components/clase/clase.component';
import { AsignarClaseComponent } from './components/asignar-clase/asignar-clase.component';
import { AulaClaseComponent } from './components/aula-clase/aula-clase.component';
import { HorarioClaseComponent } from './components/horario-clase/horario-clase.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',  // Redirigir a login en lugar de dashboard
    pathMatch: 'full',
  },
  { path: 'carreras', component: CarreraComponent },
  {
    path: 'facultades',
    component: FacultadComponent
  },
  {
    path: 'login',  // Añadir la ruta de login
    component: LoginComponent
  },
  { path: 'materias', component: MateriaComponent },
  //-----------------PROGRAMACION ACADEMICA------------
  { path: 'clases', component: ClaseComponent },
  { path: 'clases-asignacion', component: AsignarClaseComponent },
  { path: 'Aula-clase', component: AulaClaseComponent },
  { path: 'Horario-clase', component: HorarioClaseComponent },
  //licencias

  { path: 'licencias', component: LicenciaComponent },
  { path: 'detalle-licencia/:id', component: DetalleLicenciaComponent },
  { path: '', redirectTo: 'licencias', pathMatch: 'full' },


  { path: 'materia-detalle', component: MateriaDetallesComponent },

  {
    path: 'modulos',  // Añadir la ruta de modulos
    component: ModuloComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
