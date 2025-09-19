import type { Categoria } from "@/models/Categoria";
import { useEffect, useState } from "react";
import axios from "axios";

export const useGetMenu = () => {
  const [menu, setMenu] = useState<Categoria[]>([]);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Categoria[]>("")
  }, []);

  return [loading, menu, error];
};
