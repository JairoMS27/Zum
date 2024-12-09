export interface Usuario {
  usuario: string;
  contrasena: string;
  matches: string[];
  likes: number;
  superZuums: number;
  premium: boolean;
  rol: string;
}

export interface Usuarios {
  usuarios: Usuario[];
}
