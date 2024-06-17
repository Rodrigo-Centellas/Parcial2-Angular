import { Aula } from "./aula";

// src/app/models/horario.ts
export interface Horario {
  id: number;
  horarioInicio: string;
  horarioFin: string;
  dia: string;
  aula: Aula;  
}
