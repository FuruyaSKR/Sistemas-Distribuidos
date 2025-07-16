import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

const USERS_KEY = "demo_users";
const LOGGED_KEY = "demo_logged_user";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Carregar usuários e login do localStorage ao iniciar
  useEffect(() => {
    const usersRaw = localStorage.getItem(USERS_KEY);
    if (usersRaw) setUsers(JSON.parse(usersRaw));
    else setUsers([{ name: "Demo User", email: "demo@email.com" }]); // default

    const loggedRaw = localStorage.getItem(LOGGED_KEY);
    if (loggedRaw) setUser(JSON.parse(loggedRaw));
  }, []);

  // Salvar usuários sempre que mudar
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  // Salvar usuário logado sempre que mudar
  useEffect(() => {
    if (user) localStorage.setItem(LOGGED_KEY, JSON.stringify(user));
    else localStorage.removeItem(LOGGED_KEY);
  }, [user]);

  function login(email: string, password: string) {
    const found = users.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  }

  function register(name: string, email: string, password: string) {
    if (users.find((u) => u.email === email)) return false;
    const newUser = { name, email };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
