const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Ballot = await hre.ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy();
  await ballot.deployed();
  console.log("nftMarket deployed to:", ballot.address);

  let config = `
  export const ballotaddress = "${ballot.address}"
  
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("config.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
