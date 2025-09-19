import type { Ingrediente } from "./Ingrediente";

export interface Plato {
  id: number;
  nombre: string;
  descipcion: string;
  precio: number;
  ingredientes: Ingrediente[];
  img: string;
}
