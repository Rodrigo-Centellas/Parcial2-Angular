export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: string;
    ci: string ;
    direccion: string | null;
    clases: any[];
  }