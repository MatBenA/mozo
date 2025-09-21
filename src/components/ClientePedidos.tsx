import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardAction, CardContent } from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import type { Item } from "@/models/Item";

interface Props {
  order: Item[];
  removeItem: (id: number) => void;
}

export const ClientePedidos = ({ order, removeItem }: Props) => (
  <Drawer>
    <DrawerTrigger className="flex fixed self-center bottom-5 w-full max-w-md rounded-sm bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
      <ShoppingCart />
      <span>Ver Orden</span>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Mis Pedidos</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex flex-col items-center justify-center space-x-2 gap-5">
            {order.map((item) => (
              <Card key={item.plato_id}>
                <CardContent className="flex gap-3">
                  <p>{item.cantidad}</p>
                  <p>{item.nombre}</p>
                  <p>{item.importe}</p>
                  <CardAction>
                    <Button variant={"destructive"} onClick={() => removeItem(item.plato_id)}>
                      <Trash />
                    </Button>
                  </CardAction>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button>Enviar Pedido</Button>
          <DrawerClose asChild>
            <Button variant="outline">Volver</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
);
