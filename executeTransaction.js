var { ethers, BigNumber } = require('ethers')
const implementationABI = require('./nft.json');


const web3Provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/na34V2wPZksuxFnkFxeebWVexYWG_SnR");
const walletEther = new ethers.Wallet("passar sua private key aqui");
const connectedWallet = walletEther.connect(web3Provider);

//passar sempre o address do contrato Proxy com a abi do contrato implementation:
const newcontract = new ethers.Contract("0x2Eb082B375B8BA0AaE5192142a7eCE2B8ec73786", implementationABI, web3Provider);



//abis:
async function main () {
  const gasPrice = BigNumber.from("30000000000");

  const contractSigner = await newcontract.connect(connectedWallet);
  const tokensMinted = await contractSigner._tokenIds();
  console.log("Tokens mintados: " + tokensMinted);
  if(tokensMinted === 333) return;
  const transaction = await contractSigner.mintNFTOwner(3, {
    gasPrice: gasPrice, // Ajuste o preço do gás para 30 gweis
  });

  console.log(transaction)
  next();

}

async function next(){
  console.log("fui chamado")
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("iniciando main")
      main();
    }, 1000);
  });
}

main()
