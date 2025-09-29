import { Minus, Plus, Star, Clock } from "lucide-react";
import {
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useMenuStore } from "@/stores/useMenuStore";
import { useState } from "react";

interface Props {
  addItem: (id: number, cantidad: number) => void;
}

export const Menu = ({ addItem }: Props) => {
  const { menu, loading } = useMenuStore((state) => state);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  const getQuantity = (id: number) => quantities[id] || 1;

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full max-w-md mx-auto">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 loading-shimmer"></div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((j) => (
                <div key={j} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3 loading-shimmer"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 loading-shimmer"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded loading-shimmer"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {menu?.map((categoria, catIndex) => (
        <div 
          key={categoria.id} 
          className="w-full max-w-md mx-auto fade-in-up"
          style={{ animationDelay: `${catIndex * 0.1}s` }}
        >
          {/* Header de categoría mejorado */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
              {categoria.nombre}
            </h2>
            <Separator className="bg-gradient-to-r from-transparent via-primary/30 to-transparent h-px" />
          </div>

          {/* Grid de platos en lugar de carrusel para mejor UX móvil */}
          <div className="grid grid-cols-1 gap-4">
            {categoria.platos.map((plato, index) => (
              <AlertDialog key={plato.id}>
                <AlertDialogTrigger asChild>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden card-hover cursor-pointer">
                    <div className="flex p-4">
                      {/* Imagen placeholder con gradiente */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-2xl font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      
                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-base">
                          {plato.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {plato.descripcion}
                        </p>
                        
                        {/* Metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>15-20 min</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 fill-current text-amber-400" />
                              <span>4.8</span>
                            </div>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            ${plato.precio || '12.99'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AlertDialogTrigger>
                
                <AlertDialogContent className="max-w-sm mx-auto bg-white dark:bg-gray-800 border-0 shadow-strong rounded-3xl">
                  {/* Header del modal */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <AlertDialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {plato.nombre}
                    </AlertDialogTitle>
                    <div className="text-2xl font-bold text-primary mb-4">
                      ${plato.precio || '12.99'}
                    </div>
                  </div>

                  <AlertDialogDescription className="text-gray-600 dark:text-gray-400 text-center mb-6 text-base leading-relaxed">
                    {plato.descripcion}
                  </AlertDialogDescription>

                  {/* Selector de cantidad mejorado */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-12 w-12 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() => updateQuantity(plato.id, -1)}
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      
                      <div className="mx-6 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl min-w-[60px] text-center">
                        <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                          {getQuantity(plato.id)}
                        </span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-12 w-12 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() => updateQuantity(plato.id, 1)}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</div>
                    <div className="text-2xl font-bold text-primary">
                      ${((plato.precio || 12.99) * getQuantity(plato.id)).toFixed(2)}
                    </div>
                  </div>

                  <AlertDialogFooter className="space-y-3">
                    <AlertDialogAction 
                      onClick={() => addItem(plato.id, getQuantity(plato.id))}
                      className="w-full h-14 bg-gradient-primary hover:shadow-strong text-white font-semibold rounded-2xl text-lg transition-all duration-300 pulse-primary"
                    >
                      Añadir al Pedido
                    </AlertDialogAction>
                    <AlertDialogCancel className="w-full h-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border-0 rounded-2xl font-medium transition-all duration-300">
                      Cancelar
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};