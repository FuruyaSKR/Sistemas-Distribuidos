import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Routes() {
  const { user } = useAuth();
  const [page, setPage] = useState<"login" | "register">("login");

  if (!user) {
    return page === "login" ? (
      <Login onRegister={() => setPage("register")} />
    ) : (
      <Register onLogin={() => setPage("login")} />
    );
  }
  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
