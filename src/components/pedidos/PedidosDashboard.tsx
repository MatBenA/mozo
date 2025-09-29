// src/components/pedidos/PedidosDashboard.tsx
import { useState, useEffect } from 'react';
import { Bell, Filter, Clock, Users, DollarSign, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { usePedidosStore } from '../../stores/usePedidosStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { PedidoCard } from './PedidoCard';
import { NotificationCenter } from './NotificationCenter';
import { PedidoDetail } from './PedidoDetail';
import { FilterPanel } from './FilterPanel';
import type { Estado } from '../../types';

export const PedidosDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<Estado | 'TODOS'>('TODOS');
  const [soloMisPedidos, setSoloMisPedidos] = useState(false);

  const { user } = useAuthStore();
  const { 
    pedidos, 
    notifications, 
    loading, 
    selectedPedido,
    fetchPedidos,
    filtrarPorMozo,
    seleccionarPedido
  } = usePedidosStore();

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  // Filtrar pedidos según criterios seleccionados
  const pedidosFiltrados = () => {
    let result = pedidos;

    if (soloMisPedidos && user) {
      result = filtrarPorMozo(user.id);
    }

    if (filtroEstado !== 'TODOS') {
      result = result.filter(pedido => pedido.estado === filtroEstado);
    }

    return result.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  };

  // Estadísticas rápidas
  const estadisticas = {
    pedidosPendientes: pedidos.filter(p => p.estado === 'PENDIENTE').length,
    pedidosProcesando: pedidos.filter(p => p.estado === 'PROCESANDO').length,
    misPedidos: user ? filtrarPorMozo(user.id).length : 0,
    ventasDelDia: pedidos
      .filter(p => p.estado === 'PAGADO')
      .reduce((sum, p) => sum + p.total, 0)
  };

  const notificacionesNoLeidas = notifications.filter(n => !n.read).length;

  const handleRefresh = () => {
    fetchPedidos();
  };

  if (selectedPedido) {
    return <PedidoDetail pedido={selectedPedido} onClose={() => seleccionarPedido(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Panel de Pedidos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                ¡Hola {user?.nombre}! 👋
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={loading}
                className="relative"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>

              {/* Notifications Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="w-4 h-4" />
                {notificacionesNoLeidas > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {notificacionesNoLeidas}
                    </span>
                  </div>
                )}
              </Button>

              {/* Filters Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Estadísticas Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-in-up">
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                    Pendientes
                  </p>
                  <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                    {estadisticas.pedidosPendientes}
                  </p>
                </div>
                <div className="p-2 bg-amber-200 dark:bg-amber-800 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-700 dark:text-amber-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                    Procesando
                  </p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {estadisticas.pedidosProcesando}
                  </p>
                </div>
                <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-blue-700 dark:text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                    Mis Pedidos
                  </p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {estadisticas.misPedidos}
                  </p>
                </div>
                <div className="p-2 bg-green-200 dark:bg-green-800 rounded-xl">
                  <Users className="w-5 h-5 text-green-700 dark:text-green-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-800 dark:text-emerald-200 text-sm font-medium">
                    Ventas Hoy
                  </p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                    ${estadisticas.ventasDelDia.toFixed(0)}
                  </p>
                </div>
                <div className="p-2 bg-emerald-200 dark:bg-emerald-800 rounded-xl">
                  <DollarSign className="w-5 h-5 text-emerald-700 dark:text-emerald-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros Activos */}
        {(filtroEstado !== 'TODOS' || soloMisPedidos) && (
          <div className="flex items-center space-x-2 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtros activos:</span>
            {filtroEstado !== 'TODOS' && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {filtroEstado}
              </span>
            )}
            {soloMisPedidos && (
              <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                Solo mis pedidos
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFiltroEstado('TODOS');
                setSoloMisPedidos(false);
              }}
              className="text-xs h-6"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Lista de Pedidos */}
        <div className="space-y-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : pedidosFiltrados().length === 0 ? (
                            <Card className="bg-white dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-600">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Clock className="w-12 h-12 mx-auto mb-3" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No hay pedidos
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {soloMisPedidos 
                    ? "No tienes pedidos asignados con los filtros actuales"
                    : "No se encontraron pedidos con los filtros seleccionados"
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            pedidosFiltrados().map((pedido, index) => (
              <PedidoCard
                key={pedido.id}
                pedido={pedido}
                index={index}
                currentUserId={user?.id || ''}
              />
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      {showNotifications && (
        <NotificationCenter 
          onClose={() => setShowNotifications(false)}
          notifications={notifications}
        />
      )}

      {showFilters && (
        <FilterPanel
          onClose={() => setShowFilters(false)}
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          soloMisPedidos={soloMisPedidos}
          setSoloMisPedidos={setSoloMisPedidos}
        />
      )}
    </div>
  );
};