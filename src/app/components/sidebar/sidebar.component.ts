import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon: 'group', class: '' },    
    { path: '/facultades', title: 'Gestion Facultad',  icon: 'corporate_fare', class: '' },
    { path: '/modulos', title: 'Gestion Modulo',  icon: 'apartment', class: '' },
    { path: '/aulas', title: 'Gestion Aulas',  icon: 'assignment', class: '' },
    { path: '/semestres', title: 'Gestion Semestres',  icon: 'book_5', class: '' },
    { path: '/grupos', title: 'Gestion Grupo',  icon: 'apps', class: '' },    
    { path: '/carreras', title: 'Gestion Carrera',  icon: 'school', class: '' },
    { path: '/materias', title: 'Gestion Materia',  icon: 'menu_book', class: '' },
    { path: '/materia-detalle', title: 'Gestion Materia-Carrera',  icon: 'library_books', class: '' },
    { path: '/licencias', title: 'Gestion Licencias',  icon: 'library_books', class: '' },
    { path: '/clases', title: 'Gestion Clases',  icon: 'library_books', class: '' },
    { path: '/Horario-clase', title: 'Asignar Horario a clases',  icon: 'library_books', class: '' },
    { path: '/Aula-clase', title: 'Asignar Aula a clases',  icon: 'library_books', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
