export interface Project {
    id?: string;
    titulo: string;
    año: number;
    artista: string;
    direccion: string[];
    produccion: string[]; 
    direccionArte: string[];
    ayudanteArte: string[]; 
    video?: string;
    descripcion?: string;
    imagenes: string[];
    categoria: string[];
    createdAt?: string;
}