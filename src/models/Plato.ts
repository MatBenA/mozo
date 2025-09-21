import type { Ingrediente } from "./Ingrediente";

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ingredientes: Ingrediente[];
  img: string;
}
