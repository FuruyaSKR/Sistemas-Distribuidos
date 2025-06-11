// smart-contract/scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("Vaccines");
  const contract = await Factory.deploy(); // dispara o deploy
  await contract.waitForDeployment(); // espera ser minerado

  console.log("Vaccine contract deployed to:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
