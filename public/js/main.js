// import { ethers } from 'ethers';
// const ethers = require('./ethers');

// other JS
async function toggleLoader() {
	const modal = document.querySelector('#loading');
	if (modal.classList.contains('hidden')) {
		modal.classList.replace('hidden', 'flex');
	} else {
		modal.classList.replace('flex', 'hidden');
	}
}

// async function changeToSignIn() {
// 	const signUp = document.querySelector('#signUp');
// 	const signIn = document.querySelector('#signIn');
// 	signUp.style.display = "none";
// 	signIn.style.display = "flex";
// }
// async function changeToSignUp() {
// 	const signUp = document.querySelector('#signUp');
// 	const signIn = document.querySelector('#signIn');
// 	signUp.style.display = "flex";
// 	signIn.style.display = "none";
// }

var AnyTokenContract;
var connectedTokenAddress;
var con = "0x5cA890C44bFB7816d20d612B123dbB4e561A4D05";
var provider;
var signer;
var accounts;

//test
async function connect() {
	toggleLoader();
	try {
		await window.ethereum.enable();
		provider = new ethers.providers.Web3Provider(window.ethereum);
		signer = provider.getSigner();
		accounts = await provider.send("eth_requestAccounts", []);
	} catch (e) {
		toggleLoader();
		console.log(e.message);
		return;
	}

	var balance = await provider.getBalance(await signer.getAddress());
	console.log("Account:", await signer.getAddress());

	document.querySelector("#address").textContent = await signer.getAddress();
	//document.querySelector("#balance").textContent =ethers.utils.formatEther(balance);

	if ((await signer.getChainId()) == 56) {
		console.log("Connected to BSC mainnet");
		document.querySelector("#chain").textContent = "BSC Mainnet";
	} else if ((await signer.getChainId()) == 97) {
		console.log("Connected to BSC testnet");
		// document.querySelector("#ds").textContent = "BNB";
		//document.querySelector("#chain").textContent = "BSC Testnet";
	} else if ((await signer.getChainId()) == 788) {
		console.log("Connected to BSC testnet");
		document.querySelector("#ds").textContent = "TARC";
		document.querySelector("#chain").textContent = "Aerochain Testnet";
	} else if ((await signer.getChainId()) == 338) {
		console.log("Connected to BSC testnet");
		document.querySelector("#ds").textContent = "tcro";
		document.querySelector("#chain").textContent = "cronos Testnet";
	} else {
		console.log("Unknwonn chain");
		document.querySelector("#chain").textContent = "Unknown chain";
		window.alert("Network NotSupport");

	}

	// await AnyTokenConnection();
	document.querySelector('#address').disabled = "true";
	toggleLoader();
}

// variable to save the contract object
var AnyTokenContract;
var connectedTokenAddress;
var con = "0x5cA890C44bFB7816d20d612B123dbB4e561A4D05";
// takes a contract address, creates a contract object and uses it to get the name, decimals, etc
//*******************************
// HARCODE THE TOKEN ADDRESS HERE
//*******************************

async function AnyTokenConnection() {
	toggleLoader();
	let input_address = document.querySelector("#contract_token").value;

	//var input_address = "0xC2CFa729D3e61Fd81f94D885652698A8A82df2a3";

	console.log("--> CONNECTION TO BEP-20 START...");
	//This is not the real ABI this are just some of the standarts that we need
	const ABI = [
		"function name() view returns (string)",
		"function symbol() view returns (string)",
		"function decimals() view returns (uint8)",
		"function balanceOf(address account) external view returns (uint256)",
		"function transfer(address recipient, uint256 amount) external returns (bool)",
		"function approve(address spender, uint256 amount) external returns (bool)",
	];

	//here the contract object is created
	const address = input_address;
	try {
		AnyTokenContract = new ethers.Contract(address, ABI, signer);
		connectedTokenAddress = input_address;
		//Now that we have the contract object and the ABI we can call functions
		const name = await AnyTokenContract.name();

		console.log("Name: ", name);

		document.querySelector(".t_name").textContent = name;

	} catch (e) {
		// toggleLoader();
		window.alert("Check Your SmartContract");
		//alert("Hello world!");
		console.log("No connection stablished, check wallet connection or token address");
		console.log(e.message)
	}
	toggleLoader();
}

// variable to save the contract object
var PreSaleContract;
var PreSaleAddress;
var presaleOpen;
// takes a contract address, creates a contract object and uses it to get the name, decimals, etc

async function disconnectContracts() {
	AnyTokenContract = "";
	PreSaleContract = "";
}

async function getData() {
	toggleLoader();
	let Todo = {
		dataSource: "Cluster0",
		database: "aeropad",
		collection: "Launchpad"
	};
	const response = await fetch('https://proxy.aerochain.id/https://data.mongodb-api.com/app/data-yzwpa/endpoint/data/beta/action/find', {
		method: 'POST',
		body: JSON.stringify(Todo),
		headers: {
			'Access-Control-Request-Headers': '*',
			'Content-Type': 'application/json',
			"api-key": "yCbqe7v2kKidNosqMrKZwB8FZKUMjbXLCPAEGDRjM5PpUeBjS3Ll4UGhNGkL7AAF"
		}
	})
	const data = await response.json();
	toggleLoader();
	return data.documents;
}