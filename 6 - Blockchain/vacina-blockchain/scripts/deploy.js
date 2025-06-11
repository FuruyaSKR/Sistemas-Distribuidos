const hre = require("hardhat");

async function main() {
  const VaccineRecord = await hre.ethers.getContractFactory("VaccineRecord");
  const contract = await VaccineRecord.deploy();

  await contract.deployed();

  console.log("Contrato VaccineRecord implantado em:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
