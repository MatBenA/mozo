import { ClientePedidos } from "@/components/ClientePedidos";
import { Menu } from "@/components/Menu";
import { Toggle } from "@/components/ui/toggle";
import { useMenu } from "@/hooks/useMenu";
import { useOrder } from "@/hooks/useOrder";
import { ChefHat, Leaf, Shield, Milk } from "lucide-react";

const MenuPage = () => {
  useMenu();
  const { order, addItem, removeItem } = useOrder();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header con gradiente */}
      <header className="relative bg-gradient-primary text-white px-6 pt-12 pb-8 shadow-strong">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">
            Menú Digital
          </h1>
          <p className="text-white/90 text-center text-lg font-light">
            Descubre sabores únicos
          </p>
        </div>
        
        {/* Decoración de ondas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-6 fill-white dark:fill-gray-950"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </header>

      <main className="relative -mt-4 px-4 pb-32">
        {/* Filtros mejorados */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-medium p-6 mb-8 glass-effect fade-in-up">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Filtros Dietarios
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <Toggle className="h-14 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-200 rounded-xl transition-all duration-300">
              <Leaf className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Vegano</p>
                <p className="text-xs opacity-70">100% plant-based</p>
              </div>
            </Toggle>
            
            <Toggle className="h-14 bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200 rounded-xl transition-all duration-300">
              <Shield className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Sin TACC</p>
                <p className="text-xs opacity-70">Libre de gluten</p>
              </div>
            </Toggle>
            
            <Toggle className="h-14 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200 rounded-xl transition-all duration-300">
              <Milk className="w-5 h-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">Sin Lactosa</p>
                <p className="text-xs opacity-70">Dairy free</p>
              </div>
            </Toggle>
          </div>
        </div>

        {/* Contenedor del menú */}
        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Menu addItem={addItem} />
        </div>

        {/* Espaciado para el botón flotante */}
        <div className="h-20"></div>
      </main>

      {/* Botón de pedidos flotante con efecto mejorado */}
      <div className="fixed bottom-6 left-4 right-4 z-50">
        <ClientePedidos order={order} removeItem={removeItem} />
      </div>

      {/* Overlay de fondo cuando hay elementos flotantes */}
      <div className="fixed inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MenuPage; 