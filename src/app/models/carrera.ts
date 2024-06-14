// src/app/models/carrera.ts
export interface Carrera {
    id: number;
    nombre: string;
    codigo: string;
    facultad: {
      id: number;
      nombre: string;
    };
  }
  