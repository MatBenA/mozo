// src/components/pedidos/FilterPanel.tsx
import { X, Filter, User, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';
import type { Estado } from '../../types';

interface FilterPanelProps {
  onClose: () => void;
  filtroEstado: Estado | 'TODOS';
  setFiltroEstado: (estado: Estado | 'TODOS') => void;
  soloMisPedidos: boolean;
  setSoloMisPedidos: (solo: boolean) => void;
}

const estados: Array<{ value: Estado | 'TODOS'; label: string; color: string }> = [
  { value: 'TODOS', label: 'Todos', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
  { value: 'PENDIENTE', label: 'Pendientes', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' },
  { value: 'PROCESANDO', label: 'Procesando', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' },
  { value: 'ENTREGADO', label: 'Entregados', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' },
  { value: 'PAGADO', label: 'Pagados', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' },
  { value: 'CANCELADO', label: 'Cancelados', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' },
  { value: 'SIN_STOCK', label: 'Sin Stock', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200' }
];

export const FilterPanel = ({ 
  onClose, 
  filtroEstado, 
  setFiltroEstado, 
  soloMisPedidos, 
  setSoloMisPedidos 
}: FilterPanelProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-3xl shadow-strong max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Filtros
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
        <div className="p-6 space-y-6">
          {/* Filtro por mozo */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Asignación
            </h3>
            <Toggle
              pressed={soloMisPedidos}
              onPressedChange={setSoloMisPedidos}
              className="w-full justify-start h-12 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 data-[state=on]:bg-blue-500 data-[state=on]:text-white"
            >
              <div className="text-left">
                <p className="font-medium">Solo mis pedidos</p>
                <p className="text-xs opacity-70">Mostrar solo pedidos asignados a mí</p>
              </div>
            </Toggle>
          </div>

          {/* Filtro por estado */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Estado
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {estados.map((estado) => (
                <Button
                  key={estado.value}
                  variant={filtroEstado === estado.value ? "default" : "outline"}
                  onClick={() => setFiltroEstado(estado.value)}
                  className={`h-12 text-sm font-medium rounded-2xl ${
                    filtroEstado === estado.value 
                      ? 'bg-gradient-primary text-white' 
                      : `${estado.color} border-2 hover:shadow-soft`
                  }`}
                >
                  {estado.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setFiltroEstado('TODOS');
                setSoloMisPedidos(false);
              }}
              className="flex-1 h-12 rounded-2xl"
            >
              Limpiar Filtros
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 h-12 bg-gradient-primary text-white rounded-2xl"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};