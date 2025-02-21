const Web3 = require("web3");

const web3 = new Web3(process.env.BLOCKCHAIN_RPC_URL);
const contractABI = require("../blockchain/smart-contracts/NFTContract.json");
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.mintNFT = async (userAddress, courseId) => {
  const tx = contract.methods.mint(userAddress, courseId);
  return await tx.send({ from: process.env.ADMIN_WALLET });
};
