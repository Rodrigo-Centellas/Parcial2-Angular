export interface Aula {
    id: number;
    nombre: string;
    capacidad: string;
    modulo: {
      id: number;
      nombre: string;
    };
  }