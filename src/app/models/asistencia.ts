import { Clase } from "./clase";
import { Horario } from './horario';
import { User } from "./usuario";

export interface Asistencia {
    id: number;
    tipo: string;
    hora_ingreso: string;
    hora_salida: string;
    minutos_atraso: number;
    fecha: string;    
    user: User;
    clase: Clase;
    horario: Horario;
  }