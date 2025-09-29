// src/components/estadisticas/EstadisticasMozo.tsx
import {
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Award,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { usePedidosStore } from "../../stores/usePedidosStore";
import { useAuthStore } from "../../stores/useAuthStore";

export const EstadisticasMozo = () => {
  const { pedidos } = usePedidosStore();
  const { user } = useAuthStore();

  // Calcular estadísticas del mozo actual
  const misPedidos = pedidos.filter((p) => p.mozo === user?.id);
  const pedidosHoy = misPedidos.filter((p) => {
    const hoy = new Date();
    const fechaPedido = new Date(p.time);
    return fechaPedido.toDateString() === hoy.toDateString();
  });

  const estadisticas = {
    pedidosAtendidos: misPedidos.length,
    pedidosHoy: pedidosHoy.length,
    ventasDelDia: pedidosHoy
      .filter((p) => p.estado === "PAGADO")
      .reduce((sum, p) => sum + p.total, 0),
    pedidosPendientes: misPedidos.filter((p) => p.estado === "PROCESANDO")
      .length,
    tiempoPromedioAtencion: 18, // Mock data
    eficiencia: Math.round(
      (misPedidos.filter((p) => p.estado === "PAGADO").length /
        Math.max(misPedidos.length, 1)) *
        100
    ),
  };

  const tarjetas = [
    {
      titulo: "Pedidos Hoy",
      valor: estadisticas.pedidosHoy,
      icono: Target,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      titulo: "Ventas del Día",
      valor: `$${estadisticas.ventasDelDia.toFixed(0)}`,
      icono: DollarSign,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      titulo: "En Proceso",
      valor: estadisticas.pedidosPendientes,
      icono: Clock,
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
    },
    {
      titulo: "Tiempo Promedio",
      valor: `${estadisticas.tiempoPromedioAtencion}min`,
      icono: TrendingUp,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      titulo: "Total Atendidos",
      valor: estadisticas.pedidosAtendidos,
      icono: Users,
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
    },
    {
      titulo: "Eficiencia",
      valor: `${estadisticas.eficiencia}%`,
      icono: Award,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Mis Estadísticas
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Resumen de tu desempeño hoy
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {tarjetas.map((tarjeta, index) => (
          <Card
            key={tarjeta.titulo}
            className="relative overflow-hidden transition-all duration-300 hover:shadow-medium card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {tarjeta.titulo}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {tarjeta.valor}
                  </p>
                </div>
                <div className={`p-3 rounded-2xl ${tarjeta.bgColor}`}>
                  <tarjeta.icono className={`w-6 h-6 ${tarjeta.textColor}`} />
                </div>
              </div>

              {/* Barra de progreso para eficiencia */}
              {tarjeta.titulo === "Eficiencia" && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${tarjeta.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${estadisticas.eficiencia}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>{" "}
      {/* Indicadores de rendimiento */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary" />
            Rendimiento del Día
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Meta de Pedidos
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {estadisticas.pedidosHoy}/15
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (estadisticas.pedidosHoy / 15) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Meta de Ventas
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                ${estadisticas.ventasDelDia.toFixed(0)}/$500
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (estadisticas.ventasDelDia / 500) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
