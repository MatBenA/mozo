// src/types/index.ts

export type Estado = 
  | "PENDIENTE"
  | "PROCESANDO"
  | "CANCELADO"
  | "SIN_STOCK"
  | "ENTREGADO"
  | "PAGADO";

export interface Item {
  plato_id: number;
  nombre: string;
  cantidad: number;
  importe: number;
}

export interface Pedido {
  id: string;
  mozo?: string;
  mesa: number;
  estado: Estado;
  items: Item[];
  time: Date;
  total: number;
  observaciones?: string;
}

export interface Mozo {
  id: string;
  nombre: string;
  email: string;
  turno: 'mañana' | 'tarde' | 'noche';
  activo: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  token: string;
}

export interface Notification {
  id: string;
  type: 'pedido_listo' | 'sin_stock' | 'cliente_llama' | 'nuevo_pedido';
  pedidoId: string;
  mesa: number;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface EstadisticasMozo {
  pedidosAtendidos: number;
  ventasDelDia: number;
  tiempoPromedioAtencion: number;
  mesasActivas: number;
}