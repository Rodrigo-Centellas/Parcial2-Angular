import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';  // Asegúrate de que la ruta sea correcta
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',  // Redirigir a login en lugar de dashboard
    pathMatch: 'full',
  },
  {
    path: 'login',  // Añadir la ruta de login
    component: LoginComponent
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
