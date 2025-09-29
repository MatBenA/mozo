import { ShoppingCart, Trash, Receipt, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import type { Item } from "@/types/Item";

interface Props {
  order: Item[];
  removeItem: (id: number) => void;
}

export const ClientePedidos = ({ order, removeItem }: Props) => {
  const totalItems = order.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = order.reduce((sum, item) => sum + (item.importe * item.cantidad), 0);

  if (order.length === 0) {
    return null;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative">
          {/* Botón principal flotante */}
          <button className="w-full bg-gradient-primary text-white rounded-2xl shadow-strong hover:shadow-medium transition-all duration-300 pulse-primary group">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {/* Badge de cantidad */}
                  <div className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">Ver Pedido</p>
                  <p className="text-white/80 text-sm">{totalItems} artículo{totalItems !== 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </button>
        </div>
      </DrawerTrigger>
      
      <DrawerContent className="bg-white dark:bg-gray-900 border-0 max-h-[85vh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center pb-6">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6"></div>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Receipt className="w-8 h-8 text-primary" />
              </div>
            </div>
            <DrawerTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Mi Pedido
            </DrawerTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {totalItems} artículo{totalItems !== 1 ? 's' : ''} seleccionado{totalItems !== 1 ? 's' : ''}
            </p>
          </DrawerHeader>
          
          <div className="px-4 pb-0 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {order.map((item) => (
                <Card key={item.plato_id} className="bg-gray-50 dark:bg-gray-800 border-0 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Imagen placeholder */}
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-primary">
                            {item.cantidad}
                          </span>
                        </div>
                        
                        {/* Información del producto */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-base mb-1">
                            {item.nombre}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              ${item.importe} c/u
                            </span>
                            <span className="text-lg font-bold text-primary">
                              ${(item.importe * item.cantidad).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Botón eliminar */}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeItem(item.plato_id)}
                        className="ml-3 h-10 w-10 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Resumen del total */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Servicio</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  $0.00
                </span>
              </div>
              <div className="border-t border-primary/20 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="px-4 pt-6">
            <Button 
              className="w-full h-14 bg-gradient-primary hover:shadow-strong text-white font-semibold rounded-2xl text-lg mb-3 transition-all duration-300"
            >
              <Receipt className="w-5 h-5 mr-2" />
              Enviar Pedido
            </Button>
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="w-full h-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border-0 rounded-2xl font-medium"
              >
                Seguir Eligiendo
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};