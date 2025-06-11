const { registrarVacina, buscarVacina } = require("./services/vacinaService");

async function main() {
  console.log("Registrando vacina...");
  await registrarVacina("12345678900", "Hepatite B", "10/06/2025");

  console.log("Buscando vacina registrada...");
  const resultado = await buscarVacina("12345678900", 0);
  console.log("Resultado:", resultado);
}

main();
