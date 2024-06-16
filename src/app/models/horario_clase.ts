export interface HorarioClase {
  id: number;
  horario: {
    id: number;
    horarioInicio: string;
    horarioFin: string;
    dia: string;
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
