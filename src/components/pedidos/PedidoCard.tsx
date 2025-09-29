// src/components/pedidos/PedidoCard.tsx
import { Clock, MapPin, User, DollarSign, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { usePedidosStore } from '../../stores/usePedidosStore';
import { useAuthStore } from '../../stores/useAuthStore';
import type { Pedido } from '../../types';

interface Props {
  pedido: Pedido;
  index: number;
  currentUserId: string;
}

const estadoConfig = {
  PENDIENTE: {
    color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-800',
    icon: Clock,
    label: 'Pendiente'
  },
  PROCESANDO: {
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800',
    icon: User,
    label: 'Procesando'
  },
  ENTREGADO: {
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-800',
    icon: CheckCircle,
    label: 'Entregado'
  },
  PAGADO: {
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-800',
    icon: DollarSign,
    label: 'Pagado'
  },
  CANCELADO: {
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-800',
    icon: XCircle,
    label: 'Cancelado'
  },
  SIN_STOCK: {
    color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-200 dark:border-orange-800',
    icon: AlertCircle,
    label: 'Sin Stock'
  }
};

export const PedidoCard = ({ pedido, index, currentUserId }: Props) => {
  const { tomarPedido, seleccionarPedido } = usePedidosStore();
  const { user } = useAuthStore();

  const config = estadoConfig[pedido.estado];
  const IconComponent = config.icon;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `${minutes} min`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    return date.toLocaleDateString();
  };

  const esMiPedido = pedido.mozo === currentUserId;
  const puedeTomar = pedido.estado === 'PENDIENTE' && !pedido.mozo;

  const handleTomarPedido = () => {
    if (user && puedeTomar) {
      tomarPedido(pedido.id, user.id);
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-medium cursor-pointer card-hover ${esMiPedido ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => seleccionarPedido(pedido)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header con estado y mesa */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Mesa {pedido.mesa}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTime(pedido.time)}
                </p>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-full border flex items-center space-x-2 ${config.color}`}>
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium">{config.label}</span>
            </div>
          </div>

          {/* Items preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Artículos ({pedido.items.length})
            </h4>
            <div className="space-y-1">
              {pedido.items.slice(0, 2).map((item) => (
                <div key={item.plato_id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.cantidad}x {item.nombre}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    ${(item.cantidad * item.importe).toFixed(2)}
                  </span>
                </div>
              ))}
              {pedido.items.length > 2 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  +{pedido.items.length - 2} artículo{pedido.items.length - 2 > 1 ? 's' : ''} más
                </p>
              )}
            </div>
          </div>

          {/* Footer con total y acciones */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-xl font-bold text-primary">
                  ${pedido.total.toFixed(2)}
                </p>
              </div>
              
              {pedido.mozo && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {esMiPedido ? (
                    <span className="text-primary font-medium">Tu pedido</span>
                  ) : (
                    <span>Asignado</span>
                  )}
                </div>
              )}
            </div>

            {/* Botón de acción */}
            {puedeTomar && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTomarPedido();
                }}
                size="sm"
                className="bg-gradient-primary hover:shadow-medium text-white font-medium"
              >
                Tomar Pedido
              </Button>
            )}
          </div>

          {/* Observaciones si existen */}
          {pedido.observaciones && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-medium">Nota:</span> {pedido.observaciones}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};