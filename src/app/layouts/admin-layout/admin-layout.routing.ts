import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsuariosComponent } from 'app/components/usuarios/usuarios.component';
import { AulaComponent } from 'app/components/aula/aula.component';
import { GrupoComponent } from 'app/components/grupo/grupo.component';
import { CarreraComponent } from 'app/components/carrera/carrera.component';
import { FacultadComponent } from 'app/components/facultad/facultad.component';
import { ModuloComponent } from 'app/components/modulo/modulo.component';
import { MateriaComponent } from 'app/components/materia/materia.component';
import { MateriaDetallesComponent } from 'app/components/materia-detalles/materia-detalles.component';
import { SemestreComponent } from 'app/components/semestre/semestre.component';
import { LicenciaComponent } from 'app/components/licencia/licencia.component';
import { licensing } from 'googleapis/build/src/apis/licensing';
import { ClaseComponent } from 'app/components/clase/clase.component';
import { Horario } from '../../models/horario';
import { HorarioClaseComponent } from 'app/components/horario-clase/horario-clase.component';
import { AulaClase } from '../../models/aula_clase';
import { AulaClaseComponent } from 'app/components/aula-clase/aula-clase.component';
import { HorarioComponent } from 'app/components/horario/horario.component';
import { AsistenciaComponent } from 'app/components/asistencia/asistencia.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'aulas', component: AulaComponent },
    { path: 'grupos', component: GrupoComponent },
    { path: 'carreras', component: CarreraComponent },
    { path: 'facultades', component: FacultadComponent },
    {path: 'modulos', component: ModuloComponent},
    { path: 'materias', component: MateriaComponent},
    { path: 'materia-detalle', component: MateriaDetallesComponent },
    { path: 'semestres', component: SemestreComponent },
    { path: 'licencias', component: LicenciaComponent },
    { path: 'clases', component: ClaseComponent },
    { path: 'Horario-clase', component: HorarioClaseComponent },
    { path: 'Aula-clase', component: AulaClaseComponent },
    { path: 'horarios', component: HorarioComponent },
    { path: 'asistencias', component: AsistenciaComponent },
];
