const mongoose = require("mongoose");

const VacinacaoSchema = new mongoose.Schema(
  {
    cpf: String,
    tipo: String,
    data: String,
    txHash: String,
    timestamp: { type: Date, default: Date.now },
  },
  {
    collection: "vacinacao",
  }
);

module.exports = mongoose.model("Vacinacao", VacinacaoSchema);
