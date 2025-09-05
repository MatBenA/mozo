import { ThemeProvider } from "./components/theme-provider";
import { MenuPage } from "./page/MenuPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MenuPage />
    </ThemeProvider>
  );
}

export default App;