import type { Categoria } from "@/types/Categoria";
import type { AxiosError } from "axios";
import axios from "axios";
import { create } from "zustand";

interface MenuState {
  menu: Categoria[];
  loading: boolean;
  error: AxiosError | null;
  fetchMenu: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  menu: [],
  loading: false,
  error: null,
  fetchMenu: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<Categoria[]>(
        "http://192.168.100.5:3000/categorias"
      );
      set({ menu: res.data, loading: false });
    } catch (err) {
      set({ error: err as AxiosError, loading: false });
    }
  },
}));
