import { useState } from "react";
import api from "../services/api";

export default function VacinaForm() {
  const [cpf, setCpf] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/registrar-vacina", { cpf, tipo, data });
      setMensagem("✅ Vacina registrada com sucesso!");
      console.log(response.data);
    } catch (error) {
      setMensagem("❌ Erro ao registrar vacina.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo de Vacina"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit">Registrar Vacina</button>
      <p>{mensagem}</p>
    </form>
  );
}
