import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ShoppingCart } from "lucide-react";

export const MenuPage = () => {
  return (
    <section className="flex flex-col p-4 gap-8">
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

      <div className="w-full max-w-md mx-auto relative">
        <h2>Cervezas</h2>
        <Separator />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-md"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Button>
        <ShoppingCart />
        <span>Ver Orden</span>
      </Button>
    </section>
  );
};
