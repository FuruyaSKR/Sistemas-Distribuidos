import { SetStateAction, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Login({ onRegister }: { onRegister: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!login(email, password)) setErro("Email ou senha inválidos.");
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 320,
        mx: "auto",
        mt: 8,
      }}
    >
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setEmail(e.target.value)
        }
        required
      />
      <TextField
        label="Senha"
        value={password}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setPassword(e.target.value)
        }
        type="password"
        required
      />
      <Button type="submit" variant="contained">
        Entrar
      </Button>
      <Button onClick={onRegister}>Criar conta</Button>
      {erro && <Typography color="error">{erro}</Typography>}
    </Box>
  );
}
