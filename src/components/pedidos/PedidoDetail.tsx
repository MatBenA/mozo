// src/components/pedidos/PedidoDetail.tsx
import { ArrowLeft, Clock, MapPin, User, DollarSign, CheckCircle, XCircle, AlertTriangle, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { usePedidosStore } from '../../stores/usePedidosStore';
import { useAuthStore } from '../../stores/useAuthStore';
import type { Pedido, Estado } from '../../types';

interface Props {
  pedido: Pedido;
  onClose: () => void;
}

const estadoConfig = {
  PENDIENTE: { color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/20' },
  PROCESANDO: { color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  ENTREGADO: { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
  PAGADO: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/20' },
  CANCELADO: { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' },
  SIN_STOCK: { color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' }
};

export const PedidoDetail = ({ pedido, onClose }: Props) => {
  const { cambiarEstado, tomarPedido } = usePedidosStore();
  const { user } = useAuthStore();

  const config = estadoConfig[pedido.estado];
  const esMiPedido = pedido.mozo === user?.id;
  const puedeTomar = pedido.estado === 'PENDIENTE' && !pedido.mozo;

  const formatTime = (date: Date) => {
    return date.toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCambiarEstado = (nuevoEstado: Estado) => {
    cambiarEstado(pedido.id, nuevoEstado);
  };

  const handleTomarPedido = () => {
    if (user && puedeTomar) {
      tomarPedido(pedido.id, user.id);
    }
  };

  const getAccionesDisponibles = () => {
    if (!esMiPedido && pedido.mozo) return [];

    switch (pedido.estado) {
      case 'PENDIENTE':
        return puedeTomar ? ['TOMAR'] : [];
      case 'PROCESANDO':
        return ['ENTREGADO', 'CANCELADO', 'SIN_STOCK'];
      case 'ENTREGADO':
        return ['PAGADO'];
      default:
        return [];
    }
  };

  const acciones = getAccionesDisponibles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Pedido Mesa {pedido.mesa}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(pedido.time)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Estado del Pedido */}
        <Card className="fade-in-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Estado del Pedido</CardTitle>
              <div className={`px-4 py-2 rounded-full ${config.bg}`}>
                <span className={`font-semibold ${config.color}`}>
                  {pedido.estado}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mesa</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {pedido.mesa}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hora</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {pedido.time.toLocaleTimeString('es-AR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              {pedido.mozo && (
                <div className="flex items-center space-x-3 col-span-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mozo Asignado</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {esMiPedido ? 'Tú' : 'Otro mozo'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ítems del Pedido */}
        <Card className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-lg">Artículos ({pedido.items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pedido.items.map((item) => (
                <div key={item.plato_id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {item.cantidad}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {item.nombre}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.importe} c/u
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ${(item.cantidad * item.importe).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Observaciones */}
        {pedido.observaciones && (
          <Card className="fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl">
                <p className="text-yellow-800 dark:text-yellow-200">
                  {pedido.observaciones}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Total */}
        <Card className="fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total del Pedido</p>
                  <p className="text-2xl font-bold text-primary">
                    ${pedido.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        {acciones.length > 0 && (
          <div className="space-y-3 fade-in-up" style={{ animationDelay: '0.5s' }}>
            {acciones.includes('TOMAR') && (
              <Button
                onClick={handleTomarPedido}
                className="w-full h-14 bg-gradient-primary text-white font-semibold text-lg rounded-2xl"
              >
                <User className="w-5 h-5 mr-2" />
                Tomar Pedido
              </Button>
            )}

            {acciones.includes('ENTREGADO') && (
              <Button
                onClick={() => handleCambiarEstado('ENTREGADO')}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg rounded-2xl"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Marcar como Entregado
              </Button>
            )}

            {acciones.includes('PAGADO') && (
              <Button
                onClick={() => handleCambiarEstado('PAGADO')}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg rounded-2xl"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Marcar como Pagado
              </Button>
            )}

            <div className="grid grid-cols-2 gap-3">
              {acciones.includes('CANCELADO') && (
                <Button
                  onClick={() => handleCambiarEstado('CANCELADO')}
                  variant="outline"
                  className="h-12 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              )}

              {acciones.includes('SIN_STOCK') && (
                <Button
                  onClick={() => handleCambiarEstado('SIN_STOCK')}
                  variant="outline"
                  className="h-12 border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Sin Stock
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="h-8"></div>
      </main>
    </div>
  );
};