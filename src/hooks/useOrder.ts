import type { Item } from "@/models/Item";
import { useMenuStore } from "@/stores/useMenuStore";
import { useState } from "react";

export function useOrder() {
  const [order, setOrder] = useState<Item[]>([]);
  const menu = useMenuStore((state) => state.menu);

  const addItem = (id: number, cantidad: number) => {
    const item = menu
      .flatMap((categoria) => categoria.platos)
      .find((plato) => plato.id === id);

    if (!item) {
      console.error(`No se encontró un plato con id ${id}`);
      return;
    }

    setOrder((prev) => [
      ...prev,
      {
        plato_id: id,
        nombre: item.nombre,
        cantidad: cantidad,
        importe: cantidad * item.precio,
      },
    ]);
  };

  const removeItem = (id: number) => {
    setOrder((prev) => [...prev].filter((item) => item.plato_id !== id));
  };

  return { order, addItem, removeItem };
}
