import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const storedEmail = "matias@resto.com";
const storedPassword = "1234";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalido, setInvalido] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === storedEmail || password === storedPassword) {
      navigate("/pedidos");
    } else {
      setInvalido(true);
    }
  };

  return (
    <section>
      <Card>
        <CardHeader>Ingresa a tu cuenta</CardHeader>
        {invalido ? (
          <CardDescription>Credenciales invalidas</CardDescription>
        ) : (
          <></>
        )}
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Contraseña</Label>
              <Input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button>Ingresar</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
