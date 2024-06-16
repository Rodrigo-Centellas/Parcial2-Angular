// src/app/models/license.ts
import { User } from './usuario';

export interface Licencia {
  id: number;
  motivo: string;
  descripcion: string;
  inicio: string;
  fin: string;
  estado: string;
  user: User;
}