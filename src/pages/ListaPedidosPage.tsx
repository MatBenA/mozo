import { Card, CardHeader } from "@/components/ui/card";
import { User, Timer } from 'lucide-react';

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
