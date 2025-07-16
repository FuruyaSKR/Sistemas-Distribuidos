import VacinaForm from "../components/VacinaForm";
import { useAuth } from "../contexts/AuthContext";
import { Button, Typography, Box } from "@mui/material";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        width: 340,
        mx: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6">Bem-vindo, {user?.name}!</Typography>
      <VacinaForm />
      <Button onClick={logout} variant="outlined">
        Sair
      </Button>
    </Box>
  );
}
