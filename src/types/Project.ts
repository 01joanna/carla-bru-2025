export interface Project {
    id?: string;
    titulo: string; 
    año: string;
    artista?: string;
    direccion?: string[];
    produccion?: string[]; 
    direccionArte?: string[];
    ayudanteArte?: string[]; 
    video?: string;
    descripcion?: string;
    imagenes: string[];
    categoria: string;
    createdAt?: string;
    updatedAt?: string;
    selected?: boolean;
}