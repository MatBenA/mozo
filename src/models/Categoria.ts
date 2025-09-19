import type { Plato } from "./Plato";

export interface Categoria {
  id: number;
  nombre: string;
  platos: Plato[];
}
