export interface User {
    email: string;
    userName: string;
    password: string;
    img:string
    movies: Movie[];
}
export interface Movie {
    id: number;
    Titulo: String;
    Descripcion: String;
    image: String;
    valoration: number[];
}
