// src/components/pedidos/NotificationCenter.tsx
import { X, Bell, AlertTriangle, Phone, ChefHat } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { usePedidosStore } from '../../stores/usePedidosStore';
import type { Notification } from '../../types';

interface NotificationCenterProps {
  onClose: () => void;
  notifications: Notification[];
}

const notificationConfig = {
  pedido_listo: {
    icon: ChefHat,
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900/20',
    title: 'Pedido Listo'
  },
  sin_stock: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    title: 'Sin Stock'
  },
  cliente_llama: {
    icon: Phone,
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    title: 'Cliente Llama'
  },
  nuevo_pedido: {
    icon: Bell,
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    title: 'Nuevo Pedido'
  }
};

export const NotificationCenter = ({ onClose, notifications }: NotificationCenterProps) => {
  const { marcarNotificacionLeida } = usePedidosStore();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `${minutes} min`;
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      marcarNotificacionLeida(notification.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-3xl shadow-strong max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Notificaciones
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Bell className="w-12 h-12 mx-auto mb-3" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Sin notificaciones
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Te avisaremos cuando algo requiera tu atención
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((notification, index) => {
                  const config = notificationConfig[notification.type];
                  const IconComponent = config.icon;
                  
                  return (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                        !notification.read ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-xl ${config.bg}`}>
                            <IconComponent className={`w-5 h-5 ${config.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                {config.title}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-primary">
                                Mesa {notification.mesa}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};