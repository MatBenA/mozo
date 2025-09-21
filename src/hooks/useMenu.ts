import { useEffect } from "react";
import { useMenuStore } from "@/stores/useMenuStore";

export function useMenu() {
  const fetchMenu = useMenuStore(state => state.fetchMenu);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);
}