import { SetStateAction, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Register({ onLogin }: { onLogin: () => void }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!register(name, email, password)) setErro("Email já cadastrado.");
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
      <Typography variant="h5">Cadastro</Typography>
      <TextField
        label="Nome"
        value={name}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setName(e.target.value)
        }
        required
      />
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
        Registrar
      </Button>
      <Button onClick={onLogin}>Voltar para Login</Button>
      {erro && <Typography color="error">{erro}</Typography>}
    </Box>
  );
}
