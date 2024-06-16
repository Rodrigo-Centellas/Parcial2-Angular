import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../services/clase.service';
import { UserService } from '../../services/user.service';
import { GrupoService } from '../../services/grupo.service';
import { MateriaService } from '../../services/materia.service';
import { AulaService } from '../../services/aula.service';
import { HorarioService } from '../../services/horario.service';
import { Clase } from '../../models/clase';
import { User } from '../../models/usuario';
import { Grupo } from '../../models/grupo';
import { Materia } from '../../models/materia';
import { Aula } from '../../models/aula';
import { Horario } from '../../models/horario';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {
  clases: Clase[] = [];
  usuarios: User[] = [];
  grupos: Grupo[] = [];
  materias: Materia[] = [];
  aulas: Aula[] = [];
  horarios: Horario[] = [];
  selectedClase: Clase | null = null;

  constructor(
    private claseService: ClaseService,
    private userService: UserService,
    private grupoService: GrupoService,
    private materiaService: MateriaService,
    private aulaService: AulaService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.getClases();
    this.getUsuarios();
    this.getGrupos();
    this.getMaterias();
    this.getAulas();
    this.getHorarios();
  }

  getClases(): void {
    this.claseService.getClases().subscribe(clases => this.clases = clases);
  }

  getUsuarios(): void {
    this.userService.getUsers().subscribe(usuarios => this.usuarios = usuarios);
  }

  getGrupos(): void {
    this.grupoService.getGrupos().subscribe(grupos => this.grupos = grupos);
  }

  getMaterias(): void {
    this.materiaService.getMaterias().subscribe(materias => this.materias = materias);
  }

  getAulas(): void {
    this.aulaService.getAulas().subscribe(aulas => this.aulas = aulas);
  }

  getHorarios(): void {
    this.horarioService.getHorarios().subscribe(horarios => this.horarios = horarios);
  }

  selectClase(clase: Clase): void {
    this.selectedClase = { ...clase };
  }

  save(claseForm: any): void {
    if (claseForm.valid && this.selectedClase) {
      if (this.selectedClase.id) {
        this.claseService.updateClase(this.selectedClase.id, this.selectedClase)
          .subscribe(() => {
            this.getClases();
            this.selectedClase = null;
          });
      } else {
        this.claseService.createClase(this.selectedClase)
          .subscribe(() => {
            this.getClases();
            this.selectedClase = null;
          });
      }
    }
  }

  delete(clase: Clase): void {
    this.claseService.deleteClase(clase.id).subscribe(() => this.getClases());
  }

  addNew(): void {
    this.selectedClase = {
      id: 0,
      cupo: 0,
      user: {
        id: 0,
        name: '',
        email: '',
        password: '',
        rol: '',
        ci: '',
        direccion: '',
        clases: [] // Asegúrate de inicializar esta propiedad
      },
      grupo: { id: 0, nombre: '' },
      materia: { id: 0, nombre: '', sigla: '', horas: 0, nivel: 0 },
      aulas: [],
      horarios: []
    };
  }

  cancel(): void {
    this.selectedClase = null;
  }
}
