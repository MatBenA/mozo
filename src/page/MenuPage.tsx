import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";

export const MenuPage = () => {
  return (
    <section className="flex flex-col min-h-screen p-4 gap-8">
      <div className="flex gap-4">
        <Toggle className="grow">
          <p>Vegano</p>
        </Toggle>
        <Toggle className="grow">
          <p>Sin TACC</p>
        </Toggle>
        <Toggle className="grow">
          <p>Sin Lactosa</p>
        </Toggle>
      </div>

      <div className="w-full max-w-md mx-auto">
        <h2>Cervezas</h2>
        <Separator />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-md"
        >
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <AlertDialog>
                <AlertDialogTrigger>
                  <CarouselItem>
                    <div className="p-1">
                      <Card>
                        <CardContent>
                          <span>{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="flex flex-col gap-5">
                  <AlertDialogTitle>Bosque Encantado IPA</AlertDialogTitle>
                  <AlertDialogDescription className="flex flex-col gap-5 items-center">
                    <p>
                      Sumérgete en una experiencia mágica con nuestra Bosque
                      Encantado IPA $2500
                    </p>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                      >
                        <Minus />
                        <span className="sr-only">Increase</span>
                      </Button>
                      <p>3</p>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                      >
                        <Plus />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Añadir al pedido</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Drawer>
        <DrawerTrigger>
          <Button className="fixed bottom-0 left-0 w-full">
            <ShoppingCart />
            <span>Ver Orden</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Mis Pedidos</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex flex-col items-center justify-center space-x-2 gap-5">
                <Card>
                  <CardContent className="flex gap-3">
                    <p>X3</p>
                    <p>Bosque Encantado IPA</p>
                    <p>$7500</p>
                    <CardAction>
                      <Button variant={"destructive"}>
                        <Trash />
                      </Button>
                    </CardAction>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex gap-3">
                    <p>X3</p>
                    <p>Bosque Encantado IPA</p>
                    <p>$7500</p>
                    <CardAction>
                      <Button variant={"destructive"}>
                        <Trash />
                      </Button>
                    </CardAction>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex gap-3">
                    <p>X3</p>
                    <p>Bosque Encantado IPA</p>
                    <p>$7500</p>
                    <CardAction>
                      <Button variant={"destructive"}>
                        <Trash />
                      </Button>
                    </CardAction>
                  </CardContent>
                </Card>
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
    </section>
  );
};
