// src/app/models/clase.ts
import { User } from './usuario';
import { Grupo } from './grupo';
import { Materia } from './materia';
import { Aula } from './aula';
import { Horario } from './horario';

export interface Clase {
  id: number;
  cupo: number;
  user: User;
  grupo: Grupo;
  materia: Materia;
  aulas: Aula[];
  horarios: Horario[];
}
