// src/stores/usePedidosStore.ts
import { create } from 'zustand';
import type { Pedido, Estado, Notification } from '../types';

interface PedidosState {
  pedidos: Pedido[];
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  selectedPedido: Pedido | null;
  
  // Actions
  fetchPedidos: () => Promise<void>;
  tomarPedido: (pedidoId: string, mozoId: string) => void;
  cambiarEstado: (pedidoId: string, nuevoEstado: Estado) => void;
  marcarNotificacionLeida: (notificationId: string) => void;
  filtrarPorMozo: (mozoId: string) => Pedido[];
  obtenerPedidosPorEstado: (estado: Estado) => Pedido[];
  seleccionarPedido: (pedido: Pedido | null) => void;
}

// Mock data
const mockPedidos: Pedido[] = [
  {
    id: '1',
    mesa: 5,
    estado: 'PENDIENTE',
    items: [
      { plato_id: 1, nombre: 'Milanesa con Papas', cantidad: 2, importe: 18.50 },
      { plato_id: 2, nombre: 'Ensalada César', cantidad: 1, importe: 12.00 }
    ],
    time: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    total: 49.00,
    observaciones: 'Sin cebolla en la ensalada'
  },
  {
    id: '2',
    mozo: '1',
    mesa: 3,
    estado: 'PROCESANDO',
    items: [
      { plato_id: 3, nombre: 'Pizza Margherita', cantidad: 1, importe: 22.00 },
      { plato_id: 4, nombre: 'Cerveza Artesanal', cantidad: 2, importe: 8.50 }
    ],
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    total: 39.00
  },
  {
    id: '3',
    mesa: 8,
    estado: 'PENDIENTE',
    items: [
      { plato_id: 5, nombre: 'Hamburguesa Completa', cantidad: 1, importe: 16.00 },
      { plato_id: 6, nombre: 'Papas Fritas', cantidad: 1, importe: 6.50 }
    ],
    time: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    total: 22.50
  },
  {
    id: '4',
    mozo: '1',
    mesa: 12,
    estado: 'ENTREGADO',
    items: [
      { plato_id: 7, nombre: 'Pasta Carbonara', cantidad: 1, importe: 19.00 }
    ],
    time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    total: 19.00
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'pedido_listo',
    pedidoId: '2',
    mesa: 3,
    message: 'Pedido de Mesa 3 está listo para entregar',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    read: false
  },
  {
    id: '2',
    type: 'cliente_llama',
    pedidoId: '4',
    mesa: 12,
    message: 'Cliente de Mesa 12 solicita la cuenta',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false
  }
];

export const usePedidosStore = create<PedidosState>((set, get) => ({
  pedidos: mockPedidos,
  notifications: mockNotifications,
  loading: false,
  error: null,
  selectedPedido: null,

  fetchPedidos: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ pedidos: mockPedidos, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar pedidos',
        loading: false 
      });
    }
  },

  tomarPedido: (pedidoId, mozoId) => {
    set(state => ({
      pedidos: state.pedidos.map(pedido =>
        pedido.id === pedidoId
          ? { ...pedido, mozo: mozoId, estado: 'PROCESANDO' as Estado }
          : pedido
      )
    }));
  },

  cambiarEstado: (pedidoId, nuevoEstado) => {
    set(state => ({
      pedidos: state.pedidos.map(pedido =>
        pedido.id === pedidoId
          ? { ...pedido, estado: nuevoEstado }
          : pedido
      )
    }));
  },

  marcarNotificacionLeida: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    }));
  },

  filtrarPorMozo: (mozoId) => {
    const { pedidos } = get();
    return pedidos.filter(pedido => pedido.mozo === mozoId);
  },

  obtenerPedidosPorEstado: (estado) => {
    const { pedidos } = get();
    return pedidos.filter(pedido => pedido.estado === estado);
  },

  seleccionarPedido: (pedido) => {
    set({ selectedPedido: pedido });
  },
}));