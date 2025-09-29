// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { useAuthStore } from './stores/useAuthStore';
import { LoginForm } from './components/auth/LoginForm';
import { PedidosDashboard } from './components/pedidos/PedidosDashboard';
import { Navbar } from './components/layout/Navbar';
import { MenuPage } from './pages';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ThemeProvider defaultTheme="light" storageKey="mozo-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route 
              path="/login" 
              element={<LoginForm />} 
            />
            <Route 
              path="/" 
              element={<MenuPage />} 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? <PedidosDashboard /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;