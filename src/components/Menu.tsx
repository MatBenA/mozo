import { Minus, Plus } from "lucide-react";
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
import { CardContent, Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Separator } from "./ui/separator";
import { useMenuStore } from "@/stores/useMenuStore";

interface Props {
  addItem: (id: number, cantidad: number) => void;
}

export const Menu = ({ addItem }: Props) => {
  const { menu, loading } = useMenuStore((state) => state);

  if (loading) <p>Cargando Menu...</p>;

  return (
    <div>
      {menu?.map((categoria) => (
        <div className="w-full max-w-md mx-auto" key={categoria.id}>
          <h2>{categoria.nombre}</h2>
          <Separator />
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-md"
          >
            <CarouselContent>
              {categoria.platos.map((plato, index) => (
                <AlertDialog key={plato.id}>
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
                    <AlertDialogTitle>{plato.nombre}</AlertDialogTitle>
                    <AlertDialogDescription className="">
                      {plato.descripcion}
                    </AlertDialogDescription>
                    <div className="flex gap-3">
                      <Button variant="outline" size="lg">
                        <Minus />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <p>3</p>
                      <Button variant="outline" size="lg">
                        <Plus />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => addItem(plato.id, 3)}>
                        Añadir al pedido
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
};
