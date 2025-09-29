import type { Item } from "./Item";

export type Estado =
  | "PENDIENTE"
  | "PROCESANDO"
  | "CANCELADO"
  | "SIN_STOCK"
  | "ENTREGADO"
  | "PAGADO";

export interface Pedido {
  mozo?: string;
  mesa: number;
  estado: Estado;
  items: Item[];
  time: Date;
}
