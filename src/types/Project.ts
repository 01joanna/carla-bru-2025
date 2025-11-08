export interface Project {
    id?: string;
    titulo: string;
    año?: string;
    categoria?: string[];
    artista?: string | string[];
    direccion?: string | string[];
    produccion?: string | string[];
    direccionArte?: string | string[];
    ayudanteArte?: string | string[];
    descripcion?: string;
    video?: string;
    imagenes: string[];
    createdAt?: string;
    updatedAt?: string;
    selected?: boolean;
}