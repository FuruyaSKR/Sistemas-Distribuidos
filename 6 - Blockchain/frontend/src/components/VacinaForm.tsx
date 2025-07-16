import { useState, useEffect } from "react";
import api from "../services/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

export default function VacinaForm() {
  const [cpf, setCpf] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState<"ok" | "erro" | "">("");
  const [vacinas, setVacinas] = useState<any[]>([]);

  // Busca vacinas do usuário pelo CPF
  const buscarVacinas = async (cpfBusca: string) => {
    try {
      if (!cpfBusca) return;
      const res = await api.get(`/vacinas?cpf=${cpfBusca}`);
      setVacinas(res.data || []);
    } catch (e) {
      setVacinas([]);
    }
  };

  // Busca vacinas ao digitar o CPF (ao sair do campo)
  useEffect(() => {
    if (cpf) buscarVacinas(cpf);
  }, [cpf]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setStatus("");
    try {
      await api.post("/registrar-vacina", { cpf, tipo, data });
      setMensagem("Vacina registrada com sucesso!");
      setStatus("ok");
      setTipo("");
      setData("");
      buscarVacinas(cpf);
    } catch (error) {
      setMensagem("Erro ao registrar vacina.");
      setStatus("erro");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Registrar Vacina
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <TextField
          label="Tipo de Vacina"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
        <TextField
          label="Data"
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained">
          Registrar Vacina
        </Button>
        {mensagem && (
          <Alert severity={status === "ok" ? "success" : "error"}>
            {mensagem}
          </Alert>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Vacinas Cadastradas
      </Typography>
      {vacinas.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Nenhuma vacina registrada para esse CPF.
        </Typography>
      ) : (
        <List dense>
          {vacinas.map((v, i) => (
            <ListItem key={i} disableGutters>
              <ListItemText
                primary={`${v.tipo} (${v.data})`}
                secondary={`CPF: ${v.cpf}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
