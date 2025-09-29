import { Card, CardHeader } from "@/components/ui/card";
import { Bell, User, LogOut, Filter, Timer } from 'lucide-react';

const ListaPedidosPage = () => {
  return (
    <section>
      <Card>
        <CardHeader>
          <User />
          <h3>Mesa 8</h3>
          <div><Timer /></div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default ListaPedidosPage;
