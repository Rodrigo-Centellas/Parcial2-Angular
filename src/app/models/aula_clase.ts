export interface AulaClase {
  id: number;
  aula: {
    id: number;
    nombre: string;
  };
  clase: {
    id: number;
    cupo: number;
    user: any;
    grupo: any;
    materia: any;
    aulas: any[];
    horarios: any[];
  };
}
