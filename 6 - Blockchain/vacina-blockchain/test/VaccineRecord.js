const { expect } = require("chai");

describe("VaccineRecord", function () {
  it("deve registrar e buscar vacinas por CPF", async function () {
    const Vaccine = await ethers.getContractFactory("VaccineRecord");
    const vaccine = await Vaccine.deploy();
    await vaccine.deployed();

    await vaccine.registrarVacina("12345678900", "COVID-19", "01/01/2023");
    await vaccine.registrarVacina("12345678900", "Influenza", "02/02/2023");

    const total = await vaccine.quantidadeVacinas("12345678900");
    expect(total).to.equal(2);

    const [tipo, data] = await vaccine.buscarVacina("12345678900", 1);
    expect(tipo).to.equal("Influenza");
    expect(data).to.equal("02/02/2023");
  });
});
