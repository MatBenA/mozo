import { ClientePedidos } from "@/components/ClientePedidos";
import { Menu } from "@/components/Menu";
import { Toggle } from "@/components/ui/toggle";
import { useMenu } from "@/hooks/useMenu";
import { useOrder } from "@/hooks/useOrder";

export const MenuPage = () => {
  useMenu();
  const { order, addItem, removeItem } = useOrder();

  return (
    <section className="flex flex-col min-h-screen p-4 gap-8 h-100">
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

      <Menu addItem={addItem} />

      <ClientePedidos order={order} removeItem={removeItem} />
    </section>
  );
};
