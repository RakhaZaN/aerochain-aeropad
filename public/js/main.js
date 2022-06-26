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

var tes = "0xbd57029C60d080c598EbAF1cE13F9e955bC8c0Ff";

// async function approvePreSale() {
// 	//bnb = ethers.utils.parseEther( bnb_ )
// 	toggleLoader();
// 	await disconnectContracts();
// 	await AnyTokenConnection();

// 	const sent = await AnyTokenContract.approve(
// 		tes,
// 		ethers.BigNumber.from(
// 			"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
// 		)
// 	);
// 	const receipt = await sent.wait();
// 	console.log("Receipt: ", receipt);
// 	console.log("Status: ", receipt["status"]);
// 	console.log("Hash: ", receipt["transactionHash"]);
// 	console.log("From: ", receipt["from"]);

// 	toggleLoader();
// 	changeToSignIn();
// }

async function DeployPresale() {
	toggleLoader();
	let harcp = document.querySelector("#Hardcap").value
	let minbuy = document.querySelector("#minBuy").value
	let maxBuy = document.querySelector("#maxBuy").value
	let ADRs = document.querySelector("#smartcontract").value
	let socap = document.querySelector("#Softcap").value
	let rate = document.querySelector("#Presale-rate").value
	let imagelink = document.querySelector("#image").value
	let devAddress = document.querySelector("#address").value
	let name1 = document.querySelector("#name").value
	disconnectContracts();
	console.log("START PRESALE CONTRACT DEPLOYMENT...");
	const charcap = harcp;
	const cminbuy = minbuy;
	const cmaxbuy = maxBuy;
	const adres = ADRs;
	const socp = socap;
	const crate = rate;
	const cname = name1;
	const img = imagelink;
	const dev = devAddress;

	//bnb = ethers.utils.parseEther( bnb_ )

	const abi = [{
			"inputs": [],
			"name": "claimTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "deposit",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "uint256",
				"name": "amount_",
				"type": "uint256"
			}],
			"name": "depositPreSaleTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "EmergencyWithdraw",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "finalize",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "send_BNB_back",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "address",
					"name": "to_",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount_",
					"type": "uint256"
				}
			],
			"name": "sendTokens",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [{
					"internalType": "uint256",
					"name": "_cap",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_minBNB",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_maxBNB",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_tokenAddress",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "serviceFeeReceiver_",
					"type": "address"
				}
			],
			"stateMutability": "payable",
			"type": "constructor"
		},
		{
			"inputs": [],
			"name": "cap_",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"name": "contributions",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isOpen",
			"outputs": [{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "liqTokens",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "liqTokens_",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "maxBNB",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minBNB",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "moneyRaised",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner_",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "preSaleCompleted",
			"outputs": [{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "saleTokens",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}],
			"name": "SeeAddressContribution",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}],
			"name": "seeAllowance",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}],
			"name": "seeBalance",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "tokenAddress_",
			"outputs": [{
				"internalType": "address",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
				"internalType": "address",
				"name": "addr_",
				"type": "address"
			}],
			"name": "tokenAllocation",
			"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "uniswapV2Router",
			"outputs": [{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}],
			"stateMutability": "view",
			"type": "function"
		}
	]

	const bytecode = {
		"functionDebugData": {
			"@_553": {
				"entryPoint": null,
				"id": 553,
				"parameterSlots": 5,
				"returnSlots": 0
			},
			"abi_decode_t_address_fromMemory": {
				"entryPoint": 412,
				"id": null,
				"parameterSlots": 2,
				"returnSlots": 1
			},
			"abi_decode_t_uint256_fromMemory": {
				"entryPoint": 435,
				"id": null,
				"parameterSlots": 2,
				"returnSlots": 1
			},
			"abi_decode_tuple_t_uint256t_uint256t_uint256t_addresst_address_fromMemory": {
				"entryPoint": 458,
				"id": null,
				"parameterSlots": 2,
				"returnSlots": 5
			},
			"allocate_unbounded": {
				"entryPoint": null,
				"id": null,
				"parameterSlots": 0,
				"returnSlots": 1
			},
			"cleanup_t_address": {
				"entryPoint": 594,
				"id": null,
				"parameterSlots": 1,
				"returnSlots": 1
			},
			"cleanup_t_uint160": {
				"entryPoint": 614,
				"id": null,
				"parameterSlots": 1,
				"returnSlots": 1
			},
			"cleanup_t_uint256": {
				"entryPoint": 646,
				"id": null,
				"parameterSlots": 1,
				"returnSlots": 1
			},
			"revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db": {
				"entryPoint": null,
				"id": null,
				"parameterSlots": 0,
				"returnSlots": 0
			},
			"revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b": {
				"entryPoint": 656,
				"id": null,
				"parameterSlots": 0,
				"returnSlots": 0
			},
			"validator_revert_t_address": {
				"entryPoint": 661,
				"id": null,
				"parameterSlots": 1,
				"returnSlots": 0
			},
			"validator_revert_t_uint256": {
				"entryPoint": 687,
				"id": null,
				"parameterSlots": 1,
				"returnSlots": 0
			}
		},
		"generatedSources": [{
			"ast": {
				"nodeType": "YulBlock",
				"src": "0:2185:1",
				"statements": [{
						"body": {
							"nodeType": "YulBlock",
							"src": "70:80:1",
							"statements": [{
									"nodeType": "YulAssignment",
									"src": "80:22:1",
									"value": {
										"arguments": [{
											"name": "offset",
											"nodeType": "YulIdentifier",
											"src": "95:6:1"
										}],
										"functionName": {
											"name": "mload",
											"nodeType": "YulIdentifier",
											"src": "89:5:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "89:13:1"
									},
									"variableNames": [{
										"name": "value",
										"nodeType": "YulIdentifier",
										"src": "80:5:1"
									}]
								},
								{
									"expression": {
										"arguments": [{
											"name": "value",
											"nodeType": "YulIdentifier",
											"src": "138:5:1"
										}],
										"functionName": {
											"name": "validator_revert_t_address",
											"nodeType": "YulIdentifier",
											"src": "111:26:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "111:33:1"
									},
									"nodeType": "YulExpressionStatement",
									"src": "111:33:1"
								}
							]
						},
						"name": "abi_decode_t_address_fromMemory",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
								"name": "offset",
								"nodeType": "YulTypedName",
								"src": "48:6:1",
								"type": ""
							},
							{
								"name": "end",
								"nodeType": "YulTypedName",
								"src": "56:3:1",
								"type": ""
							}
						],
						"returnVariables": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "64:5:1",
							"type": ""
						}],
						"src": "7:143:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "219:80:1",
							"statements": [{
									"nodeType": "YulAssignment",
									"src": "229:22:1",
									"value": {
										"arguments": [{
											"name": "offset",
											"nodeType": "YulIdentifier",
											"src": "244:6:1"
										}],
										"functionName": {
											"name": "mload",
											"nodeType": "YulIdentifier",
											"src": "238:5:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "238:13:1"
									},
									"variableNames": [{
										"name": "value",
										"nodeType": "YulIdentifier",
										"src": "229:5:1"
									}]
								},
								{
									"expression": {
										"arguments": [{
											"name": "value",
											"nodeType": "YulIdentifier",
											"src": "287:5:1"
										}],
										"functionName": {
											"name": "validator_revert_t_uint256",
											"nodeType": "YulIdentifier",
											"src": "260:26:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "260:33:1"
									},
									"nodeType": "YulExpressionStatement",
									"src": "260:33:1"
								}
							]
						},
						"name": "abi_decode_t_uint256_fromMemory",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
								"name": "offset",
								"nodeType": "YulTypedName",
								"src": "197:6:1",
								"type": ""
							},
							{
								"name": "end",
								"nodeType": "YulTypedName",
								"src": "205:3:1",
								"type": ""
							}
						],
						"returnVariables": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "213:5:1",
							"type": ""
						}],
						"src": "156:143:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "450:832:1",
							"statements": [{
									"body": {
										"nodeType": "YulBlock",
										"src": "497:83:1",
										"statements": [{
											"expression": {
												"arguments": [],
												"functionName": {
													"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
													"nodeType": "YulIdentifier",
													"src": "499:77:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "499:79:1"
											},
											"nodeType": "YulExpressionStatement",
											"src": "499:79:1"
										}]
									},
									"condition": {
										"arguments": [{
												"arguments": [{
														"name": "dataEnd",
														"nodeType": "YulIdentifier",
														"src": "471:7:1"
													},
													{
														"name": "headStart",
														"nodeType": "YulIdentifier",
														"src": "480:9:1"
													}
												],
												"functionName": {
													"name": "sub",
													"nodeType": "YulIdentifier",
													"src": "467:3:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "467:23:1"
											},
											{
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "492:3:1",
												"type": "",
												"value": "160"
											}
										],
										"functionName": {
											"name": "slt",
											"nodeType": "YulIdentifier",
											"src": "463:3:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "463:33:1"
									},
									"nodeType": "YulIf",
									"src": "460:120:1"
								},
								{
									"nodeType": "YulBlock",
									"src": "590:128:1",
									"statements": [{
											"nodeType": "YulVariableDeclaration",
											"src": "605:15:1",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "619:1:1",
												"type": "",
												"value": "0"
											},
											"variables": [{
												"name": "offset",
												"nodeType": "YulTypedName",
												"src": "609:6:1",
												"type": ""
											}]
										},
										{
											"nodeType": "YulAssignment",
											"src": "634:74:1",
											"value": {
												"arguments": [{
														"arguments": [{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "680:9:1"
															},
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "691:6:1"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "676:3:1"
														},
														"nodeType": "YulFunctionCall",
														"src": "676:22:1"
													},
													{
														"name": "dataEnd",
														"nodeType": "YulIdentifier",
														"src": "700:7:1"
													}
												],
												"functionName": {
													"name": "abi_decode_t_uint256_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "644:31:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "644:64:1"
											},
											"variableNames": [{
												"name": "value0",
												"nodeType": "YulIdentifier",
												"src": "634:6:1"
											}]
										}
									]
								},
								{
									"nodeType": "YulBlock",
									"src": "728:129:1",
									"statements": [{
											"nodeType": "YulVariableDeclaration",
											"src": "743:16:1",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "757:2:1",
												"type": "",
												"value": "32"
											},
											"variables": [{
												"name": "offset",
												"nodeType": "YulTypedName",
												"src": "747:6:1",
												"type": ""
											}]
										},
										{
											"nodeType": "YulAssignment",
											"src": "773:74:1",
											"value": {
												"arguments": [{
														"arguments": [{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "819:9:1"
															},
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "830:6:1"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "815:3:1"
														},
														"nodeType": "YulFunctionCall",
														"src": "815:22:1"
													},
													{
														"name": "dataEnd",
														"nodeType": "YulIdentifier",
														"src": "839:7:1"
													}
												],
												"functionName": {
													"name": "abi_decode_t_uint256_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "783:31:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "783:64:1"
											},
											"variableNames": [{
												"name": "value1",
												"nodeType": "YulIdentifier",
												"src": "773:6:1"
											}]
										}
									]
								},
								{
									"nodeType": "YulBlock",
									"src": "867:129:1",
									"statements": [{
											"nodeType": "YulVariableDeclaration",
											"src": "882:16:1",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "896:2:1",
												"type": "",
												"value": "64"
											},
											"variables": [{
												"name": "offset",
												"nodeType": "YulTypedName",
												"src": "886:6:1",
												"type": ""
											}]
										},
										{
											"nodeType": "YulAssignment",
											"src": "912:74:1",
											"value": {
												"arguments": [{
														"arguments": [{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "958:9:1"
															},
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "969:6:1"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "954:3:1"
														},
														"nodeType": "YulFunctionCall",
														"src": "954:22:1"
													},
													{
														"name": "dataEnd",
														"nodeType": "YulIdentifier",
														"src": "978:7:1"
													}
												],
												"functionName": {
													"name": "abi_decode_t_uint256_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "922:31:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "922:64:1"
											},
											"variableNames": [{
												"name": "value2",
												"nodeType": "YulIdentifier",
												"src": "912:6:1"
											}]
										}
									]
								},
								{
									"nodeType": "YulBlock",
									"src": "1006:129:1",
									"statements": [{
											"nodeType": "YulVariableDeclaration",
											"src": "1021:16:1",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "1035:2:1",
												"type": "",
												"value": "96"
											},
											"variables": [{
												"name": "offset",
												"nodeType": "YulTypedName",
												"src": "1025:6:1",
												"type": ""
											}]
										},
										{
											"nodeType": "YulAssignment",
											"src": "1051:74:1",
											"value": {
												"arguments": [{
														"arguments": [{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1097:9:1"
															},
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "1108:6:1"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1093:3:1"
														},
														"nodeType": "YulFunctionCall",
														"src": "1093:22:1"
													},
													{
														"name": "dataEnd",
														"nodeType": "YulIdentifier",
														"src": "1117:7:1"
													}
												],
												"functionName": {
													"name": "abi_decode_t_address_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "1061:31:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "1061:64:1"
											},
											"variableNames": [{
												"name": "value3",
												"nodeType": "YulIdentifier",
												"src": "1051:6:1"
											}]
										}
									]
								},
								{
									"nodeType": "YulBlock",
									"src": "1145:130:1",
									"statements": [{
											"nodeType": "YulVariableDeclaration",
											"src": "1160:17:1",
											"value": {
												"kind": "number",
												"nodeType": "YulLiteral",
												"src": "1174:3:1",
												"type": "",
												"value": "128"
											},
											"variables": [{
												"name": "offset",
												"nodeType": "YulTypedName",
												"src": "1164:6:1",
												"type": ""
											}]
										},
										{
											"nodeType": "YulAssignment",
											"src": "1191:74:1",
											"value": {
												"arguments": [{
														"arguments": [{
																"name": "headStart",
																"nodeType": "YulIdentifier",
																"src": "1237:9:1"
															},
															{
																"name": "offset",
																"nodeType": "YulIdentifier",
																"src": "1248:6:1"
															}
														],
														"functionName": {
															"name": "add",
															"nodeType": "YulIdentifier",
															"src": "1233:3:1"
														},
														"nodeType": "YulFunctionCall",
														"src": "1233:22:1"
													},
													{
														"name": "dataEnd",
														"nodeType": "YulIdentifier",
														"src": "1257:7:1"
													}
												],
												"functionName": {
													"name": "abi_decode_t_address_fromMemory",
													"nodeType": "YulIdentifier",
													"src": "1201:31:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "1201:64:1"
											},
											"variableNames": [{
												"name": "value4",
												"nodeType": "YulIdentifier",
												"src": "1191:6:1"
											}]
										}
									]
								}
							]
						},
						"name": "abi_decode_tuple_t_uint256t_uint256t_uint256t_addresst_address_fromMemory",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
								"name": "headStart",
								"nodeType": "YulTypedName",
								"src": "388:9:1",
								"type": ""
							},
							{
								"name": "dataEnd",
								"nodeType": "YulTypedName",
								"src": "399:7:1",
								"type": ""
							}
						],
						"returnVariables": [{
								"name": "value0",
								"nodeType": "YulTypedName",
								"src": "411:6:1",
								"type": ""
							},
							{
								"name": "value1",
								"nodeType": "YulTypedName",
								"src": "419:6:1",
								"type": ""
							},
							{
								"name": "value2",
								"nodeType": "YulTypedName",
								"src": "427:6:1",
								"type": ""
							},
							{
								"name": "value3",
								"nodeType": "YulTypedName",
								"src": "435:6:1",
								"type": ""
							},
							{
								"name": "value4",
								"nodeType": "YulTypedName",
								"src": "443:6:1",
								"type": ""
							}
						],
						"src": "305:977:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1328:35:1",
							"statements": [{
								"nodeType": "YulAssignment",
								"src": "1338:19:1",
								"value": {
									"arguments": [{
										"kind": "number",
										"nodeType": "YulLiteral",
										"src": "1354:2:1",
										"type": "",
										"value": "64"
									}],
									"functionName": {
										"name": "mload",
										"nodeType": "YulIdentifier",
										"src": "1348:5:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "1348:9:1"
								},
								"variableNames": [{
									"name": "memPtr",
									"nodeType": "YulIdentifier",
									"src": "1338:6:1"
								}]
							}]
						},
						"name": "allocate_unbounded",
						"nodeType": "YulFunctionDefinition",
						"returnVariables": [{
							"name": "memPtr",
							"nodeType": "YulTypedName",
							"src": "1321:6:1",
							"type": ""
						}],
						"src": "1288:75:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1414:51:1",
							"statements": [{
								"nodeType": "YulAssignment",
								"src": "1424:35:1",
								"value": {
									"arguments": [{
										"name": "value",
										"nodeType": "YulIdentifier",
										"src": "1453:5:1"
									}],
									"functionName": {
										"name": "cleanup_t_uint160",
										"nodeType": "YulIdentifier",
										"src": "1435:17:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "1435:24:1"
								},
								"variableNames": [{
									"name": "cleaned",
									"nodeType": "YulIdentifier",
									"src": "1424:7:1"
								}]
							}]
						},
						"name": "cleanup_t_address",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "1396:5:1",
							"type": ""
						}],
						"returnVariables": [{
							"name": "cleaned",
							"nodeType": "YulTypedName",
							"src": "1406:7:1",
							"type": ""
						}],
						"src": "1369:96:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1516:81:1",
							"statements": [{
								"nodeType": "YulAssignment",
								"src": "1526:65:1",
								"value": {
									"arguments": [{
											"name": "value",
											"nodeType": "YulIdentifier",
											"src": "1541:5:1"
										},
										{
											"kind": "number",
											"nodeType": "YulLiteral",
											"src": "1548:42:1",
											"type": "",
											"value": "0xffffffffffffffffffffffffffffffffffffffff"
										}
									],
									"functionName": {
										"name": "and",
										"nodeType": "YulIdentifier",
										"src": "1537:3:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "1537:54:1"
								},
								"variableNames": [{
									"name": "cleaned",
									"nodeType": "YulIdentifier",
									"src": "1526:7:1"
								}]
							}]
						},
						"name": "cleanup_t_uint160",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "1498:5:1",
							"type": ""
						}],
						"returnVariables": [{
							"name": "cleaned",
							"nodeType": "YulTypedName",
							"src": "1508:7:1",
							"type": ""
						}],
						"src": "1471:126:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1648:32:1",
							"statements": [{
								"nodeType": "YulAssignment",
								"src": "1658:16:1",
								"value": {
									"name": "value",
									"nodeType": "YulIdentifier",
									"src": "1669:5:1"
								},
								"variableNames": [{
									"name": "cleaned",
									"nodeType": "YulIdentifier",
									"src": "1658:7:1"
								}]
							}]
						},
						"name": "cleanup_t_uint256",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "1630:5:1",
							"type": ""
						}],
						"returnVariables": [{
							"name": "cleaned",
							"nodeType": "YulTypedName",
							"src": "1640:7:1",
							"type": ""
						}],
						"src": "1603:77:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1775:28:1",
							"statements": [{
								"expression": {
									"arguments": [{
											"kind": "number",
											"nodeType": "YulLiteral",
											"src": "1792:1:1",
											"type": "",
											"value": "0"
										},
										{
											"kind": "number",
											"nodeType": "YulLiteral",
											"src": "1795:1:1",
											"type": "",
											"value": "0"
										}
									],
									"functionName": {
										"name": "revert",
										"nodeType": "YulIdentifier",
										"src": "1785:6:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "1785:12:1"
								},
								"nodeType": "YulExpressionStatement",
								"src": "1785:12:1"
							}]
						},
						"name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
						"nodeType": "YulFunctionDefinition",
						"src": "1686:117:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1898:28:1",
							"statements": [{
								"expression": {
									"arguments": [{
											"kind": "number",
											"nodeType": "YulLiteral",
											"src": "1915:1:1",
											"type": "",
											"value": "0"
										},
										{
											"kind": "number",
											"nodeType": "YulLiteral",
											"src": "1918:1:1",
											"type": "",
											"value": "0"
										}
									],
									"functionName": {
										"name": "revert",
										"nodeType": "YulIdentifier",
										"src": "1908:6:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "1908:12:1"
								},
								"nodeType": "YulExpressionStatement",
								"src": "1908:12:1"
							}]
						},
						"name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
						"nodeType": "YulFunctionDefinition",
						"src": "1809:117:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "1975:79:1",
							"statements": [{
								"body": {
									"nodeType": "YulBlock",
									"src": "2032:16:1",
									"statements": [{
										"expression": {
											"arguments": [{
													"kind": "number",
													"nodeType": "YulLiteral",
													"src": "2041:1:1",
													"type": "",
													"value": "0"
												},
												{
													"kind": "number",
													"nodeType": "YulLiteral",
													"src": "2044:1:1",
													"type": "",
													"value": "0"
												}
											],
											"functionName": {
												"name": "revert",
												"nodeType": "YulIdentifier",
												"src": "2034:6:1"
											},
											"nodeType": "YulFunctionCall",
											"src": "2034:12:1"
										},
										"nodeType": "YulExpressionStatement",
										"src": "2034:12:1"
									}]
								},
								"condition": {
									"arguments": [{
										"arguments": [{
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "1998:5:1"
											},
											{
												"arguments": [{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "2023:5:1"
												}],
												"functionName": {
													"name": "cleanup_t_address",
													"nodeType": "YulIdentifier",
													"src": "2005:17:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "2005:24:1"
											}
										],
										"functionName": {
											"name": "eq",
											"nodeType": "YulIdentifier",
											"src": "1995:2:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "1995:35:1"
									}],
									"functionName": {
										"name": "iszero",
										"nodeType": "YulIdentifier",
										"src": "1988:6:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "1988:43:1"
								},
								"nodeType": "YulIf",
								"src": "1985:63:1"
							}]
						},
						"name": "validator_revert_t_address",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "1968:5:1",
							"type": ""
						}],
						"src": "1932:122:1"
					},
					{
						"body": {
							"nodeType": "YulBlock",
							"src": "2103:79:1",
							"statements": [{
								"body": {
									"nodeType": "YulBlock",
									"src": "2160:16:1",
									"statements": [{
										"expression": {
											"arguments": [{
													"kind": "number",
													"nodeType": "YulLiteral",
													"src": "2169:1:1",
													"type": "",
													"value": "0"
												},
												{
													"kind": "number",
													"nodeType": "YulLiteral",
													"src": "2172:1:1",
													"type": "",
													"value": "0"
												}
											],
											"functionName": {
												"name": "revert",
												"nodeType": "YulIdentifier",
												"src": "2162:6:1"
											},
											"nodeType": "YulFunctionCall",
											"src": "2162:12:1"
										},
										"nodeType": "YulExpressionStatement",
										"src": "2162:12:1"
									}]
								},
								"condition": {
									"arguments": [{
										"arguments": [{
												"name": "value",
												"nodeType": "YulIdentifier",
												"src": "2126:5:1"
											},
											{
												"arguments": [{
													"name": "value",
													"nodeType": "YulIdentifier",
													"src": "2151:5:1"
												}],
												"functionName": {
													"name": "cleanup_t_uint256",
													"nodeType": "YulIdentifier",
													"src": "2133:17:1"
												},
												"nodeType": "YulFunctionCall",
												"src": "2133:24:1"
											}
										],
										"functionName": {
											"name": "eq",
											"nodeType": "YulIdentifier",
											"src": "2123:2:1"
										},
										"nodeType": "YulFunctionCall",
										"src": "2123:35:1"
									}],
									"functionName": {
										"name": "iszero",
										"nodeType": "YulIdentifier",
										"src": "2116:6:1"
									},
									"nodeType": "YulFunctionCall",
									"src": "2116:43:1"
								},
								"nodeType": "YulIf",
								"src": "2113:63:1"
							}]
						},
						"name": "validator_revert_t_uint256",
						"nodeType": "YulFunctionDefinition",
						"parameters": [{
							"name": "value",
							"nodeType": "YulTypedName",
							"src": "2096:5:1",
							"type": ""
						}],
						"src": "2060:122:1"
					}
				]
			},
			"contents": "{\n\n    function abi_decode_t_address_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function abi_decode_t_uint256_fromMemory(offset, end) -> value {\n        value := mload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_uint256t_uint256t_uint256t_addresst_address_fromMemory(headStart, dataEnd) -> value0, value1, value2, value3, value4 {\n        if slt(sub(dataEnd, headStart), 160) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 96\n\n            value3 := abi_decode_t_address_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 128\n\n            value4 := abi_decode_t_address_fromMemory(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n}\n",
			"id": 1,
			"language": "Yul",
			"name": "#utility.yul"
		}],
		"linkReferences": {},
		"object": "6101206040526000600360006101000a81548160ff0219169083151502179055506000600360016101000a81548160ff0219169083151502179055506000600755604051620023ed380380620023ed8339818101604052810190620000659190620001ca565b8460a081815250508360c081815250508260e081815250508173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b8152505073d99d1c33f9fc3444f8101754abc46c52416550d173ffffffffffffffffffffffffffffffffffffffff166101008173ffffffffffffffffffffffffffffffffffffffff1660601b81525050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346004819055508073ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505015801562000190573d6000803e3d6000fd5b505050505050620002c9565b600081519050620001ad8162000295565b92915050565b600081519050620001c481620002af565b92915050565b600080600080600060a08688031215620001e957620001e862000290565b5b6000620001f988828901620001b3565b95505060206200020c88828901620001b3565b94505060406200021f88828901620001b3565b935050606062000232888289016200019c565b925050608062000245888289016200019c565b9150509295509295909350565b60006200025f8262000266565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b620002a08162000252565b8114620002ac57600080fd5b50565b620002ba8162000286565b8114620002c657600080fd5b50565b60805160601c60a05160c05160e0516101005160601c6120696200038460003960008181610741015281816114ff01526115910152600081816107670152610edf015260008181610a710152610e7c0152600081816106e90152818161080e01528181610fab0152611013015260008181610585015281816106330152818161071b015281816108660152818161091401528181610a9701528181610b8a01528181610c60015281816114c301526115ce01526120696000f3fe6080604052600436106101665760003560e01c806349003551116100d15780638da5cb5b1161008a578063cc6a1a0611610064578063cc6a1a0614610520578063d0e30db014610537578063d33aa8e514610541578063e76630791461055857610166565b80638da5cb5b1461048d5780639136a5ec146104b8578063b0b9603b146104f557610166565b8063490035511461037d5780634b0b945e146103ba5780634bb278f3146103e5578063517311ea146103fc578063521886b3146104275780638aeb87071461045057610166565b80634123fec7116101235780634123fec71461026b57806342e94c901461029657806343248084146102d3578063440e1e69146102fe57806347535d7b1461033b57806348c54b9d1461036657610166565b806305ab421d1461016b57806307fb363a146101945780630d056513146101bf57806310051089146101ea5780631694505e146102155780631e377df014610240575b600080fd5b34801561017757600080fd5b50610192600480360381019061018d919061174b565b610583565b005b3480156101a057600080fd5b506101a96106e5565b6040516101b69190611bf8565b60405180910390f35b3480156101cb57600080fd5b506101d461070d565b6040516101e19190611bf8565b60405180910390f35b3480156101f657600080fd5b506101ff610717565b60405161020c91906119dd565b60405180910390f35b34801561022157600080fd5b5061022a61073f565b6040516102379190611afd565b60405180910390f35b34801561024c57600080fd5b50610255610763565b6040516102629190611bf8565b60405180910390f35b34801561027757600080fd5b5061028061078b565b60405161028d9190611bf8565b60405180910390f35b3480156102a257600080fd5b506102bd60048036038101906102b8919061171e565b610791565b6040516102ca9190611bf8565b60405180910390f35b3480156102df57600080fd5b506102e86107a9565b6040516102f59190611ae2565b60405180910390f35b34801561030a57600080fd5b506103256004803603810190610320919061171e565b6107c0565b6040516103329190611bf8565b60405180910390f35b34801561034757600080fd5b50610350610842565b60405161035d9190611ae2565b60405180910390f35b34801561037257600080fd5b5061037b610859565b005b34801561038957600080fd5b506103a4600480360381019061039f919061171e565b610a0a565b6040516103b19190611bf8565b60405180910390f35b3480156103c657600080fd5b506103cf610a53565b6040516103dc9190611bf8565b60405180910390f35b3480156103f157600080fd5b506103fa610a5d565b005b34801561040857600080fd5b50610411610a6d565b60405161041e9190611bf8565b60405180910390f35b34801561043357600080fd5b5061044e600480360381019061044991906117b8565b610a95565b005b34801561045c57600080fd5b506104776004803603810190610472919061171e565b610b86565b6040516104849190611bf8565b60405180910390f35b34801561049957600080fd5b506104a2610c38565b6040516104af91906119dd565b60405180910390f35b3480156104c457600080fd5b506104df60048036038101906104da919061171e565b610c5c565b6040516104ec9190611bf8565b60405180910390f35b34801561050157600080fd5b5061050a610d10565b6040516105179190611bf8565b60405180910390f35b34801561052c57600080fd5b50610535610d16565b005b61053f610e7a565b005b34801561054d57600080fd5b506105566111e3565b005b34801561056457600080fd5b5061056d61146c565b60405161057a91906119dd565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663095ea7b330836040518363ffffffff1660e01b81526004016105de929190611a58565b602060405180830381600087803b1580156105f857600080fd5b505af115801561060c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610630919061178b565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3084846040518463ffffffff1660e01b815260040161068e93929190611a21565b602060405180830381600087803b1580156106a857600080fd5b505af11580156106bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e0919061178b565b505050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600554905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b7f000000000000000000000000000000000000000000000000000000000000000081565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60055481565b60086020528060005260406000206000915090505481565b6000600360009054906101000a900460ff16905090565b600080610837600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546108326006547f0000000000000000000000000000000000000000000000000000000000000000611495565b6114ab565b905080915050919050565b6000600360019054906101000a900460ff16905090565b600065e35fa931a00090507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663095ea7b330836040518363ffffffff1660e01b81526004016108bf929190611a58565b602060405180830381600087803b1580156108d957600080fd5b505af11580156108ed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610911919061178b565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b815260040161096f93929190611a21565b602060405180830381600087803b15801561098957600080fd5b505af115801561099d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c1919061178b565b506000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600254905090565b610a6b6005546002546114c1565b565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610af293929190611a21565b602060405180830381600087803b158015610b0c57600080fd5b505af1158015610b20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b44919061178b565b506001600360016101000a81548160ff021916908315150217905550610b6b816002611495565b600581905550610b7d8160055461168d565b60068190555050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b8152600401610be191906119dd565b60206040518083038186803b158015610bf957600080fd5b505afa158015610c0d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3191906117e5565b9050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e83306040518363ffffffff1660e01b8152600401610cb99291906119f8565b60206040518083038186803b158015610cd157600080fd5b505afa158015610ce5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d0991906117e5565b9050919050565b60065481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610da4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9b90611b58565b60405180910390fd5b600047905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1682604051610df0906119c8565b60006040518083038185875af1925050503d8060008114610e2d576040519150601f19603f3d011682016040523d82523d6000602084013e610e32565b606091505b5050905080610e76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e6d90611b18565b60405180910390fd5b5050565b7f0000000000000000000000000000000000000000000000000000000000000000341015610edd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed490611bd8565b60405180910390fd5b7f0000000000000000000000000000000000000000000000000000000000000000341115610f40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3790611b78565b60405180910390fd5b600360009054906101000a900460ff1615610f90576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8790611b38565b60405180910390fd5b3460026000828254610fa29190611c2f565b925050819055507f0000000000000000000000000000000000000000000000000000000000000000600254111561100e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161100590611bb8565b60405180910390fd5b6110377f00000000000000000000000000000000000000000000000000000000000000006116a3565b6002541061105b576001600360006101000a81548160ff0219169083151502179055505b6000805b6007548110156110e8573373ffffffffffffffffffffffffffffffffffffffff166009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110d557600191505b80806110e090611dd4565b91505061105f565b506000151581151514611130576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161112790611b98565b60405180910390fd5b3360096000600754815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600760008154809291906111db90611dd4565b919050555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611271576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161126890611b58565b60405180910390fd5b60005b60075481101561144e5760006009600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008273ffffffffffffffffffffffffffffffffffffffff1682604051611320906119c8565b60006040518083038185875af1925050503d806000811461135d576040519150601f19603f3d011682016040523d82523d6000602084013e611362565b606091505b50509050806113a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161139d90611b18565b60405180910390fd5b81600260008282546113b89190611d10565b925050819055506009600085815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055505050808061144690611dd4565b915050611274565b506000600360006101000a81548160ff021916908315150217905550565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600081836114a39190611c85565b905092915050565b600081836114b99190611cb6565b905092915050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b815260040161153c929190611a58565b602060405180830381600087803b15801561155657600080fd5b505af115801561156a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061158e919061178b565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663f305d719827f00000000000000000000000000000000000000000000000000000000000000008560008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16426040518863ffffffff1660e01b815260040161163496959493929190611a81565b6060604051808303818588803b15801561164d57600080fd5b505af1158015611661573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906116869190611812565b5050505050565b6000818361169b9190611d10565b905092915050565b60008060648360636116b59190611cb6565b6116bf9190611c85565b905080915050919050565b6000813590506116d981611fee565b92915050565b6000815190506116ee81612005565b92915050565b6000813590506117038161201c565b92915050565b6000815190506117188161201c565b92915050565b60006020828403121561173457611733611e7b565b5b6000611742848285016116ca565b91505092915050565b6000806040838503121561176257611761611e7b565b5b6000611770858286016116ca565b9250506020611781858286016116f4565b9150509250929050565b6000602082840312156117a1576117a0611e7b565b5b60006117af848285016116df565b91505092915050565b6000602082840312156117ce576117cd611e7b565b5b60006117dc848285016116f4565b91505092915050565b6000602082840312156117fb576117fa611e7b565b5b600061180984828501611709565b91505092915050565b60008060006060848603121561182b5761182a611e7b565b5b600061183986828701611709565b935050602061184a86828701611709565b925050604061185b86828701611709565b9150509250925092565b61186e81611d44565b82525050565b61187d81611d56565b82525050565b61188c81611d8c565b82525050565b61189b81611d9e565b82525050565b60006118ae601483611c1e565b91506118b982611e80565b602082019050919050565b60006118d1601683611c1e565b91506118dc82611ea9565b602082019050919050565b60006118f4600983611c1e565b91506118ff82611ed2565b602082019050919050565b6000611917600083611c13565b915061192282611efb565b600082019050919050565b600061193a601883611c1e565b915061194582611efe565b602082019050919050565b600061195d602b83611c1e565b915061196882611f27565b604082019050919050565b6000611980602783611c1e565b915061198b82611f76565b604082019050919050565b60006119a3601a83611c1e565b91506119ae82611fc5565b602082019050919050565b6119c281611d82565b82525050565b60006119d38261190a565b9150819050919050565b60006020820190506119f26000830184611865565b92915050565b6000604082019050611a0d6000830185611865565b611a1a6020830184611865565b9392505050565b6000606082019050611a366000830186611865565b611a436020830185611865565b611a5060408301846119b9565b949350505050565b6000604082019050611a6d6000830185611865565b611a7a60208301846119b9565b9392505050565b600060c082019050611a966000830189611865565b611aa360208301886119b9565b611ab06040830187611892565b611abd6060830186611892565b611aca6080830185611865565b611ad760a08301846119b9565b979650505050505050565b6000602082019050611af76000830184611874565b92915050565b6000602082019050611b126000830184611883565b92915050565b60006020820190508181036000830152611b31816118a1565b9050919050565b60006020820190508181036000830152611b51816118c4565b9050919050565b60006020820190508181036000830152611b71816118e7565b9050919050565b60006020820190508181036000830152611b918161192d565b9050919050565b60006020820190508181036000830152611bb181611950565b9050919050565b60006020820190508181036000830152611bd181611973565b9050919050565b60006020820190508181036000830152611bf181611996565b9050919050565b6000602082019050611c0d60008301846119b9565b92915050565b600081905092915050565b600082825260208201905092915050565b6000611c3a82611d82565b9150611c4583611d82565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611c7a57611c79611e1d565b5b828201905092915050565b6000611c9082611d82565b9150611c9b83611d82565b925082611cab57611caa611e4c565b5b828204905092915050565b6000611cc182611d82565b9150611ccc83611d82565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611d0557611d04611e1d565b5b828202905092915050565b6000611d1b82611d82565b9150611d2683611d82565b925082821015611d3957611d38611e1d565b5b828203905092915050565b6000611d4f82611d62565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000611d9782611db0565b9050919050565b6000611da982611d82565b9050919050565b6000611dbb82611dc2565b9050919050565b6000611dcd82611d62565b9050919050565b6000611ddf82611d82565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611e1257611e11611e1d565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600080fd5b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b7f43617020697320616c7265616479207265616368656400000000000000000000600082015250565b7f4e6f74206f776e65720000000000000000000000000000000000000000000000600082015250565b50565b7f4465706f7369742056616c756520697320546f6f204269670000000000000000600082015250565b7f596f75206861766520616c726561647920636f6e747269627574656420746f2060008201527f7468652070726573616c65000000000000000000000000000000000000000000602082015250565b7f52657665727465643a20424e42206465706f73697420776f756c6420676f206f60008201527f7665722063617000000000000000000000000000000000000000000000000000602082015250565b7f4465706f7369742056616c756520697320546f6f20536d616c6c000000000000600082015250565b611ff781611d44565b811461200257600080fd5b50565b61200e81611d56565b811461201957600080fd5b50565b61202581611d82565b811461203057600080fd5b5056fea2646970667358221220c65e6262d385d945745d66b95f74dfabcbde4aec14ddc3086858d47478b5ad5164736f6c63430008070033",
		"opcodes": "PUSH2 0x120 PUSH1 0x40 MSTORE PUSH1 0x0 PUSH1 0x3 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP PUSH1 0x0 PUSH1 0x3 PUSH1 0x1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP PUSH1 0x0 PUSH1 0x7 SSTORE PUSH1 0x40 MLOAD PUSH3 0x23ED CODESIZE SUB DUP1 PUSH3 0x23ED DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE DUP2 ADD SWAP1 PUSH3 0x65 SWAP2 SWAP1 PUSH3 0x1CA JUMP JUMPDEST DUP5 PUSH1 0xA0 DUP2 DUP2 MSTORE POP POP DUP4 PUSH1 0xC0 DUP2 DUP2 MSTORE POP POP DUP3 PUSH1 0xE0 DUP2 DUP2 MSTORE POP POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x80 DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x60 SHL DUP2 MSTORE POP POP PUSH20 0xD99D1C33F9FC3444F8101754ABC46C52416550D1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x100 DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x60 SHL DUP2 MSTORE POP POP CALLER PUSH1 0x0 DUP1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP CALLVALUE PUSH1 0x4 DUP2 SWAP1 SSTORE POP DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x8FC PUSH1 0x4 SLOAD SWAP1 DUP2 ISZERO MUL SWAP1 PUSH1 0x40 MLOAD PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP9 DUP9 CALL SWAP4 POP POP POP POP ISZERO DUP1 ISZERO PUSH3 0x190 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP POP POP PUSH3 0x2C9 JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH3 0x1AD DUP2 PUSH3 0x295 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH3 0x1C4 DUP2 PUSH3 0x2AF JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0xA0 DUP7 DUP9 SUB SLT ISZERO PUSH3 0x1E9 JUMPI PUSH3 0x1E8 PUSH3 0x290 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH3 0x1F9 DUP9 DUP3 DUP10 ADD PUSH3 0x1B3 JUMP JUMPDEST SWAP6 POP POP PUSH1 0x20 PUSH3 0x20C DUP9 DUP3 DUP10 ADD PUSH3 0x1B3 JUMP JUMPDEST SWAP5 POP POP PUSH1 0x40 PUSH3 0x21F DUP9 DUP3 DUP10 ADD PUSH3 0x1B3 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x60 PUSH3 0x232 DUP9 DUP3 DUP10 ADD PUSH3 0x19C JUMP JUMPDEST SWAP3 POP POP PUSH1 0x80 PUSH3 0x245 DUP9 DUP3 DUP10 ADD PUSH3 0x19C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP6 POP SWAP3 SWAP6 SWAP1 SWAP4 POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x25F DUP3 PUSH3 0x266 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH3 0x2A0 DUP2 PUSH3 0x252 JUMP JUMPDEST DUP2 EQ PUSH3 0x2AC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH3 0x2BA DUP2 PUSH3 0x286 JUMP JUMPDEST DUP2 EQ PUSH3 0x2C6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH1 0x80 MLOAD PUSH1 0x60 SHR PUSH1 0xA0 MLOAD PUSH1 0xC0 MLOAD PUSH1 0xE0 MLOAD PUSH2 0x100 MLOAD PUSH1 0x60 SHR PUSH2 0x2069 PUSH3 0x384 PUSH1 0x0 CODECOPY PUSH1 0x0 DUP2 DUP2 PUSH2 0x741 ADD MSTORE DUP2 DUP2 PUSH2 0x14FF ADD MSTORE PUSH2 0x1591 ADD MSTORE PUSH1 0x0 DUP2 DUP2 PUSH2 0x767 ADD MSTORE PUSH2 0xEDF ADD MSTORE PUSH1 0x0 DUP2 DUP2 PUSH2 0xA71 ADD MSTORE PUSH2 0xE7C ADD MSTORE PUSH1 0x0 DUP2 DUP2 PUSH2 0x6E9 ADD MSTORE DUP2 DUP2 PUSH2 0x80E ADD MSTORE DUP2 DUP2 PUSH2 0xFAB ADD MSTORE PUSH2 0x1013 ADD MSTORE PUSH1 0x0 DUP2 DUP2 PUSH2 0x585 ADD MSTORE DUP2 DUP2 PUSH2 0x633 ADD MSTORE DUP2 DUP2 PUSH2 0x71B ADD MSTORE DUP2 DUP2 PUSH2 0x866 ADD MSTORE DUP2 DUP2 PUSH2 0x914 ADD MSTORE DUP2 DUP2 PUSH2 0xA97 ADD MSTORE DUP2 DUP2 PUSH2 0xB8A ADD MSTORE DUP2 DUP2 PUSH2 0xC60 ADD MSTORE DUP2 DUP2 PUSH2 0x14C3 ADD MSTORE PUSH2 0x15CE ADD MSTORE PUSH2 0x2069 PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x166 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x49003551 GT PUSH2 0xD1 JUMPI DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x8A JUMPI DUP1 PUSH4 0xCC6A1A06 GT PUSH2 0x64 JUMPI DUP1 PUSH4 0xCC6A1A06 EQ PUSH2 0x520 JUMPI DUP1 PUSH4 0xD0E30DB0 EQ PUSH2 0x537 JUMPI DUP1 PUSH4 0xD33AA8E5 EQ PUSH2 0x541 JUMPI DUP1 PUSH4 0xE7663079 EQ PUSH2 0x558 JUMPI PUSH2 0x166 JUMP JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x48D JUMPI DUP1 PUSH4 0x9136A5EC EQ PUSH2 0x4B8 JUMPI DUP1 PUSH4 0xB0B9603B EQ PUSH2 0x4F5 JUMPI PUSH2 0x166 JUMP JUMPDEST DUP1 PUSH4 0x49003551 EQ PUSH2 0x37D JUMPI DUP1 PUSH4 0x4B0B945E EQ PUSH2 0x3BA JUMPI DUP1 PUSH4 0x4BB278F3 EQ PUSH2 0x3E5 JUMPI DUP1 PUSH4 0x517311EA EQ PUSH2 0x3FC JUMPI DUP1 PUSH4 0x521886B3 EQ PUSH2 0x427 JUMPI DUP1 PUSH4 0x8AEB8707 EQ PUSH2 0x450 JUMPI PUSH2 0x166 JUMP JUMPDEST DUP1 PUSH4 0x4123FEC7 GT PUSH2 0x123 JUMPI DUP1 PUSH4 0x4123FEC7 EQ PUSH2 0x26B JUMPI DUP1 PUSH4 0x42E94C90 EQ PUSH2 0x296 JUMPI DUP1 PUSH4 0x43248084 EQ PUSH2 0x2D3 JUMPI DUP1 PUSH4 0x440E1E69 EQ PUSH2 0x2FE JUMPI DUP1 PUSH4 0x47535D7B EQ PUSH2 0x33B JUMPI DUP1 PUSH4 0x48C54B9D EQ PUSH2 0x366 JUMPI PUSH2 0x166 JUMP JUMPDEST DUP1 PUSH4 0x5AB421D EQ PUSH2 0x16B JUMPI DUP1 PUSH4 0x7FB363A EQ PUSH2 0x194 JUMPI DUP1 PUSH4 0xD056513 EQ PUSH2 0x1BF JUMPI DUP1 PUSH4 0x10051089 EQ PUSH2 0x1EA JUMPI DUP1 PUSH4 0x1694505E EQ PUSH2 0x215 JUMPI DUP1 PUSH4 0x1E377DF0 EQ PUSH2 0x240 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x177 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x192 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x18D SWAP2 SWAP1 PUSH2 0x174B JUMP JUMPDEST PUSH2 0x583 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1A0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1A9 PUSH2 0x6E5 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1B6 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1CB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1D4 PUSH2 0x70D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1E1 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x1FF PUSH2 0x717 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x20C SWAP2 SWAP1 PUSH2 0x19DD JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x221 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x22A PUSH2 0x73F JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x237 SWAP2 SWAP1 PUSH2 0x1AFD JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x24C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x255 PUSH2 0x763 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x262 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x277 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x280 PUSH2 0x78B JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x28D SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2A2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2BD PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2B8 SWAP2 SWAP1 PUSH2 0x171E JUMP JUMPDEST PUSH2 0x791 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2CA SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2DF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x2E8 PUSH2 0x7A9 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2F5 SWAP2 SWAP1 PUSH2 0x1AE2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x30A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x325 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x320 SWAP2 SWAP1 PUSH2 0x171E JUMP JUMPDEST PUSH2 0x7C0 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x332 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x347 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x350 PUSH2 0x842 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x35D SWAP2 SWAP1 PUSH2 0x1AE2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x372 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x37B PUSH2 0x859 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x389 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x3A4 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x39F SWAP2 SWAP1 PUSH2 0x171E JUMP JUMPDEST PUSH2 0xA0A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x3B1 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x3C6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x3CF PUSH2 0xA53 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x3DC SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x3F1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x3FA PUSH2 0xA5D JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x408 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x411 PUSH2 0xA6D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x41E SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x433 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x44E PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x449 SWAP2 SWAP1 PUSH2 0x17B8 JUMP JUMPDEST PUSH2 0xA95 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x45C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x477 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x472 SWAP2 SWAP1 PUSH2 0x171E JUMP JUMPDEST PUSH2 0xB86 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x484 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x499 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x4A2 PUSH2 0xC38 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x4AF SWAP2 SWAP1 PUSH2 0x19DD JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x4C4 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x4DF PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x4DA SWAP2 SWAP1 PUSH2 0x171E JUMP JUMPDEST PUSH2 0xC5C JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x4EC SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x501 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x50A PUSH2 0xD10 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x517 SWAP2 SWAP1 PUSH2 0x1BF8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x535 PUSH2 0xD16 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x53F PUSH2 0xE7A JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x54D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x556 PUSH2 0x11E3 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x564 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x56D PUSH2 0x146C JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x57A SWAP2 SWAP1 PUSH2 0x19DD JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x95EA7B3 ADDRESS DUP4 PUSH1 0x40 MLOAD DUP4 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x5DE SWAP3 SWAP2 SWAP1 PUSH2 0x1A58 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x5F8 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x60C JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x630 SWAP2 SWAP1 PUSH2 0x178B JUMP JUMPDEST POP PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x23B872DD ADDRESS DUP5 DUP5 PUSH1 0x40 MLOAD DUP5 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x68E SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1A21 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x6A8 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x6BC JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x6E0 SWAP2 SWAP1 PUSH2 0x178B JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x5 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH32 0x0 DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x5 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x8 PUSH1 0x20 MSTORE DUP1 PUSH1 0x0 MSTORE PUSH1 0x40 PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP2 POP SWAP1 POP SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x3 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH2 0x837 PUSH1 0x8 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0x832 PUSH1 0x6 SLOAD PUSH32 0x0 PUSH2 0x1495 JUMP JUMPDEST PUSH2 0x14AB JUMP JUMPDEST SWAP1 POP DUP1 SWAP2 POP POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x3 PUSH1 0x1 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH6 0xE35FA931A000 SWAP1 POP PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x95EA7B3 ADDRESS DUP4 PUSH1 0x40 MLOAD DUP4 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x8BF SWAP3 SWAP2 SWAP1 PUSH2 0x1A58 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x8D9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x8ED JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x911 SWAP2 SWAP1 PUSH2 0x178B JUMP JUMPDEST POP PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x23B872DD ADDRESS CALLER DUP5 PUSH1 0x40 MLOAD DUP5 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x96F SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1A21 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x989 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x99D JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x9C1 SWAP2 SWAP1 PUSH2 0x178B JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0x8 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x8 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH2 0xA6B PUSH1 0x5 SLOAD PUSH1 0x2 SLOAD PUSH2 0x14C1 JUMP JUMPDEST JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x23B872DD CALLER ADDRESS DUP5 PUSH1 0x40 MLOAD DUP5 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xAF2 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1A21 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xB0C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0xB20 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0xB44 SWAP2 SWAP1 PUSH2 0x178B JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x3 PUSH1 0x1 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP PUSH2 0xB6B DUP2 PUSH1 0x2 PUSH2 0x1495 JUMP JUMPDEST PUSH1 0x5 DUP2 SWAP1 SSTORE POP PUSH2 0xB7D DUP2 PUSH1 0x5 SLOAD PUSH2 0x168D JUMP JUMPDEST PUSH1 0x6 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x70A08231 DUP4 PUSH1 0x40 MLOAD DUP3 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xBE1 SWAP2 SWAP1 PUSH2 0x19DD JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xBF9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0xC0D JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0xC31 SWAP2 SWAP1 PUSH2 0x17E5 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0xDD62ED3E DUP4 ADDRESS PUSH1 0x40 MLOAD DUP4 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xCB9 SWAP3 SWAP2 SWAP1 PUSH2 0x19F8 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xCD1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0xCE5 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0xD09 SWAP2 SWAP1 PUSH2 0x17E5 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x6 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0xDA4 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xD9B SWAP1 PUSH2 0x1B58 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 SELFBALANCE SWAP1 POP PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH1 0x40 MLOAD PUSH2 0xDF0 SWAP1 PUSH2 0x19C8 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP8 GAS CALL SWAP3 POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0xE2D JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0xE32 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP SWAP1 POP DUP1 PUSH2 0xE76 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xE6D SWAP1 PUSH2 0x1B18 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP POP JUMP JUMPDEST PUSH32 0x0 CALLVALUE LT ISZERO PUSH2 0xEDD JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xED4 SWAP1 PUSH2 0x1BD8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH32 0x0 CALLVALUE GT ISZERO PUSH2 0xF40 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xF37 SWAP1 PUSH2 0x1B78 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND ISZERO PUSH2 0xF90 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xF87 SWAP1 PUSH2 0x1B38 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST CALLVALUE PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xFA2 SWAP2 SWAP1 PUSH2 0x1C2F JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH32 0x0 PUSH1 0x2 SLOAD GT ISZERO PUSH2 0x100E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1005 SWAP1 PUSH2 0x1BB8 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x1037 PUSH32 0x0 PUSH2 0x16A3 JUMP JUMPDEST PUSH1 0x2 SLOAD LT PUSH2 0x105B JUMPI PUSH1 0x1 PUSH1 0x3 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP JUMPDEST PUSH1 0x0 DUP1 JUMPDEST PUSH1 0x7 SLOAD DUP2 LT ISZERO PUSH2 0x10E8 JUMPI CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x9 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x10D5 JUMPI PUSH1 0x1 SWAP2 POP JUMPDEST DUP1 DUP1 PUSH2 0x10E0 SWAP1 PUSH2 0x1DD4 JUMP JUMPDEST SWAP2 POP POP PUSH2 0x105F JUMP JUMPDEST POP PUSH1 0x0 ISZERO ISZERO DUP2 ISZERO ISZERO EQ PUSH2 0x1130 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1127 SWAP1 PUSH2 0x1B98 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST CALLER PUSH1 0x9 PUSH1 0x0 PUSH1 0x7 SLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP CALLVALUE PUSH1 0x8 PUSH1 0x0 CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP PUSH1 0x7 PUSH1 0x0 DUP2 SLOAD DUP1 SWAP3 SWAP2 SWAP1 PUSH2 0x11DB SWAP1 PUSH2 0x1DD4 JUMP JUMPDEST SWAP2 SWAP1 POP SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x1271 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1268 SWAP1 PUSH2 0x1B58 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 JUMPDEST PUSH1 0x7 SLOAD DUP2 LT ISZERO PUSH2 0x144E JUMPI PUSH1 0x0 PUSH1 0x9 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP PUSH1 0x0 PUSH1 0x8 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP PUSH1 0x0 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH1 0x40 MLOAD PUSH2 0x1320 SWAP1 PUSH2 0x19C8 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP8 GAS CALL SWAP3 POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x135D JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x1362 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP SWAP1 POP DUP1 PUSH2 0x13A6 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x139D SWAP1 PUSH2 0x1B18 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP2 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x13B8 SWAP2 SWAP1 PUSH2 0x1D10 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x9 PUSH1 0x0 DUP6 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD SWAP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 SSTORE PUSH1 0x8 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SSTORE POP POP POP DUP1 DUP1 PUSH2 0x1446 SWAP1 PUSH2 0x1DD4 JUMP JUMPDEST SWAP2 POP POP PUSH2 0x1274 JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0x3 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 DUP4 PUSH2 0x14A3 SWAP2 SWAP1 PUSH2 0x1C85 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP4 PUSH2 0x14B9 SWAP2 SWAP1 PUSH2 0x1CB6 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x95EA7B3 PUSH32 0x0 DUP5 PUSH1 0x40 MLOAD DUP4 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x153C SWAP3 SWAP2 SWAP1 PUSH2 0x1A58 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x1556 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x156A JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x158E SWAP2 SWAP1 PUSH2 0x178B JUMP JUMPDEST POP PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0xF305D719 DUP3 PUSH32 0x0 DUP6 PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND TIMESTAMP PUSH1 0x40 MLOAD DUP9 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1634 SWAP7 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1A81 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP6 DUP9 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x164D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x1661 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x1686 SWAP2 SWAP1 PUSH2 0x1812 JUMP JUMPDEST POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP4 PUSH2 0x169B SWAP2 SWAP1 PUSH2 0x1D10 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x64 DUP4 PUSH1 0x63 PUSH2 0x16B5 SWAP2 SWAP1 PUSH2 0x1CB6 JUMP JUMPDEST PUSH2 0x16BF SWAP2 SWAP1 PUSH2 0x1C85 JUMP JUMPDEST SWAP1 POP DUP1 SWAP2 POP POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x16D9 DUP2 PUSH2 0x1FEE JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0x16EE DUP2 PUSH2 0x2005 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1703 DUP2 PUSH2 0x201C JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0x1718 DUP2 PUSH2 0x201C JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1734 JUMPI PUSH2 0x1733 PUSH2 0x1E7B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1742 DUP5 DUP3 DUP6 ADD PUSH2 0x16CA JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1762 JUMPI PUSH2 0x1761 PUSH2 0x1E7B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1770 DUP6 DUP3 DUP7 ADD PUSH2 0x16CA JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0x1781 DUP6 DUP3 DUP7 ADD PUSH2 0x16F4 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x17A1 JUMPI PUSH2 0x17A0 PUSH2 0x1E7B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x17AF DUP5 DUP3 DUP6 ADD PUSH2 0x16DF JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x17CE JUMPI PUSH2 0x17CD PUSH2 0x1E7B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x17DC DUP5 DUP3 DUP6 ADD PUSH2 0x16F4 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x17FB JUMPI PUSH2 0x17FA PUSH2 0x1E7B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1809 DUP5 DUP3 DUP6 ADD PUSH2 0x1709 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0x182B JUMPI PUSH2 0x182A PUSH2 0x1E7B JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1839 DUP7 DUP3 DUP8 ADD PUSH2 0x1709 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x20 PUSH2 0x184A DUP7 DUP3 DUP8 ADD PUSH2 0x1709 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 PUSH2 0x185B DUP7 DUP3 DUP8 ADD PUSH2 0x1709 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH2 0x186E DUP2 PUSH2 0x1D44 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x187D DUP2 PUSH2 0x1D56 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x188C DUP2 PUSH2 0x1D8C JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x189B DUP2 PUSH2 0x1D9E JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x18AE PUSH1 0x14 DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x18B9 DUP3 PUSH2 0x1E80 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x18D1 PUSH1 0x16 DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x18DC DUP3 PUSH2 0x1EA9 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x18F4 PUSH1 0x9 DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x18FF DUP3 PUSH2 0x1ED2 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1917 PUSH1 0x0 DUP4 PUSH2 0x1C13 JUMP JUMPDEST SWAP2 POP PUSH2 0x1922 DUP3 PUSH2 0x1EFB JUMP JUMPDEST PUSH1 0x0 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x193A PUSH1 0x18 DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x1945 DUP3 PUSH2 0x1EFE JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x195D PUSH1 0x2B DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x1968 DUP3 PUSH2 0x1F27 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1980 PUSH1 0x27 DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x198B DUP3 PUSH2 0x1F76 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x19A3 PUSH1 0x1A DUP4 PUSH2 0x1C1E JUMP JUMPDEST SWAP2 POP PUSH2 0x19AE DUP3 PUSH2 0x1FC5 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x19C2 DUP2 PUSH2 0x1D82 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x19D3 DUP3 PUSH2 0x190A JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x19F2 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x1865 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 DUP3 ADD SWAP1 POP PUSH2 0x1A0D PUSH1 0x0 DUP4 ADD DUP6 PUSH2 0x1865 JUMP JUMPDEST PUSH2 0x1A1A PUSH1 0x20 DUP4 ADD DUP5 PUSH2 0x1865 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x60 DUP3 ADD SWAP1 POP PUSH2 0x1A36 PUSH1 0x0 DUP4 ADD DUP7 PUSH2 0x1865 JUMP JUMPDEST PUSH2 0x1A43 PUSH1 0x20 DUP4 ADD DUP6 PUSH2 0x1865 JUMP JUMPDEST PUSH2 0x1A50 PUSH1 0x40 DUP4 ADD DUP5 PUSH2 0x19B9 JUMP JUMPDEST SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 DUP3 ADD SWAP1 POP PUSH2 0x1A6D PUSH1 0x0 DUP4 ADD DUP6 PUSH2 0x1865 JUMP JUMPDEST PUSH2 0x1A7A PUSH1 0x20 DUP4 ADD DUP5 PUSH2 0x19B9 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xC0 DUP3 ADD SWAP1 POP PUSH2 0x1A96 PUSH1 0x0 DUP4 ADD DUP10 PUSH2 0x1865 JUMP JUMPDEST PUSH2 0x1AA3 PUSH1 0x20 DUP4 ADD DUP9 PUSH2 0x19B9 JUMP JUMPDEST PUSH2 0x1AB0 PUSH1 0x40 DUP4 ADD DUP8 PUSH2 0x1892 JUMP JUMPDEST PUSH2 0x1ABD PUSH1 0x60 DUP4 ADD DUP7 PUSH2 0x1892 JUMP JUMPDEST PUSH2 0x1ACA PUSH1 0x80 DUP4 ADD DUP6 PUSH2 0x1865 JUMP JUMPDEST PUSH2 0x1AD7 PUSH1 0xA0 DUP4 ADD DUP5 PUSH2 0x19B9 JUMP JUMPDEST SWAP8 SWAP7 POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x1AF7 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x1874 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x1B12 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x1883 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1B31 DUP2 PUSH2 0x18A1 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1B51 DUP2 PUSH2 0x18C4 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1B71 DUP2 PUSH2 0x18E7 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1B91 DUP2 PUSH2 0x192D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1BB1 DUP2 PUSH2 0x1950 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1BD1 DUP2 PUSH2 0x1973 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1BF1 DUP2 PUSH2 0x1996 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x1C0D PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x19B9 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C3A DUP3 PUSH2 0x1D82 JUMP JUMPDEST SWAP2 POP PUSH2 0x1C45 DUP4 PUSH2 0x1D82 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0x1C7A JUMPI PUSH2 0x1C79 PUSH2 0x1E1D JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C90 DUP3 PUSH2 0x1D82 JUMP JUMPDEST SWAP2 POP PUSH2 0x1C9B DUP4 PUSH2 0x1D82 JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0x1CAB JUMPI PUSH2 0x1CAA PUSH2 0x1E4C JUMP JUMPDEST JUMPDEST DUP3 DUP3 DIV SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1CC1 DUP3 PUSH2 0x1D82 JUMP JUMPDEST SWAP2 POP PUSH2 0x1CCC DUP4 PUSH2 0x1D82 JUMP JUMPDEST SWAP3 POP DUP2 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DIV DUP4 GT DUP3 ISZERO ISZERO AND ISZERO PUSH2 0x1D05 JUMPI PUSH2 0x1D04 PUSH2 0x1E1D JUMP JUMPDEST JUMPDEST DUP3 DUP3 MUL SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1D1B DUP3 PUSH2 0x1D82 JUMP JUMPDEST SWAP2 POP PUSH2 0x1D26 DUP4 PUSH2 0x1D82 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 LT ISZERO PUSH2 0x1D39 JUMPI PUSH2 0x1D38 PUSH2 0x1E1D JUMP JUMPDEST JUMPDEST DUP3 DUP3 SUB SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1D4F DUP3 PUSH2 0x1D62 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 ISZERO ISZERO SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1D97 DUP3 PUSH2 0x1DB0 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1DA9 DUP3 PUSH2 0x1D82 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1DBB DUP3 PUSH2 0x1DC2 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1DCD DUP3 PUSH2 0x1D62 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1DDF DUP3 PUSH2 0x1D82 JUMP JUMPDEST SWAP2 POP PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 EQ ISZERO PUSH2 0x1E12 JUMPI PUSH2 0x1E11 PUSH2 0x1E1D JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH32 0x4661696C656420746F2073656E64204574686572000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x43617020697320616C7265616479207265616368656400000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4E6F74206F776E65720000000000000000000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST POP JUMP JUMPDEST PUSH32 0x4465706F7369742056616C756520697320546F6F204269670000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x596F75206861766520616C726561647920636F6E747269627574656420746F20 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7468652070726573616C65000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x52657665727465643A20424E42206465706F73697420776F756C6420676F206F PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7665722063617000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4465706F7369742056616C756520697320546F6F20536D616C6C000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH2 0x1FF7 DUP2 PUSH2 0x1D44 JUMP JUMPDEST DUP2 EQ PUSH2 0x2002 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x200E DUP2 PUSH2 0x1D56 JUMP JUMPDEST DUP2 EQ PUSH2 0x2019 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x2025 DUP2 PUSH2 0x1D82 JUMP JUMPDEST DUP2 EQ PUSH2 0x2030 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xC6 0x5E PUSH3 0x62D385 0xD9 GASLIMIT PUSH21 0x5D66B95F74DFABCBDE4AEC14DDC3086858D47478B5 0xAD MLOAD PUSH5 0x736F6C6343 STOP ADDMOD SMOD STOP CALLER ",
		"sourceMap": "5671:7171:0:-:0;;;6063:5;6037:31;;;;;;;;;;;;;;;;;;;;6095:5;6075:25;;;;;;;;;;;;;;;;;;;;6393:1;6367:27;;6568:460;;;;;;;;;;;;;;;;;;;;;:::i;:::-;6697:4;6691:10;;;;;;6733:7;6712:28;;;;;;6772:7;6751:28;;;;;;6805:13;6790:28;;;;;;;;;;;;6867:42;6829:81;;;;;;;;;;;;6929:10;6921:5;;:18;;;;;;;;;;;;;;;;;;6956:9;6950:3;:15;;;;6984:19;6976:37;;:42;7014:3;;6976:42;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6568:460;;;;;5671:7171;;7:143:1;64:5;95:6;89:13;80:22;;111:33;138:5;111:33;:::i;:::-;7:143;;;;:::o;156:::-;213:5;244:6;238:13;229:22;;260:33;287:5;260:33;:::i;:::-;156:143;;;;:::o;305:977::-;411:6;419;427;435;443;492:3;480:9;471:7;467:23;463:33;460:120;;;499:79;;:::i;:::-;460:120;619:1;644:64;700:7;691:6;680:9;676:22;644:64;:::i;:::-;634:74;;590:128;757:2;783:64;839:7;830:6;819:9;815:22;783:64;:::i;:::-;773:74;;728:129;896:2;922:64;978:7;969:6;958:9;954:22;922:64;:::i;:::-;912:74;;867:129;1035:2;1061:64;1117:7;1108:6;1097:9;1093:22;1061:64;:::i;:::-;1051:74;;1006:129;1174:3;1201:64;1257:7;1248:6;1237:9;1233:22;1201:64;:::i;:::-;1191:74;;1145:130;305:977;;;;;;;;:::o;1369:96::-;1406:7;1435:24;1453:5;1435:24;:::i;:::-;1424:35;;1369:96;;;:::o;1471:126::-;1508:7;1548:42;1541:5;1537:54;1526:65;;1471:126;;;:::o;1603:77::-;1640:7;1669:5;1658:16;;1603:77;;;:::o;1809:117::-;1918:1;1915;1908:12;1932:122;2005:24;2023:5;2005:24;:::i;:::-;1998:5;1995:35;1985:63;;2044:1;2041;2034:12;1985:63;1932:122;:::o;2060:::-;2133:24;2151:5;2133:24;:::i;:::-;2126:5;2123:35;2113:63;;2172:1;2169;2162:12;2113:63;2060:122;:::o;5671:7171:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"
	}
	if (connectedTokenAddress == null) {
		console.log("Not connected to a BEP-20 Token, NO PRESALE DEPLOYED");
		return;
	}

	// The factory we use for deploying contracts
	let factory = new ethers.ContractFactory(abi, bytecode, signer);
	var feevalue = 1;
	var con = "0x5cA890C44bFB7816d20d612B123dbB4e561A4D05";

	// Deploy an instance of the contract

	//it takes cap, minbnb, maxbnb, token address
	console.log("Using Token address: " + connectedTokenAddress);
	let contract = await factory.deploy(
		ethers.utils.parseEther(charcap),
		ethers.utils.parseEther(cminbuy),
		ethers.utils.parseEther(cmaxbuy),
		connectedTokenAddress,
		con, {
			value: ethers.utils.parseEther("0.1"),
		}
	);
	// The address is available immediately, but the contract
	// is NOT deployed yet
	console.log(contract.address);

	const receipt = await contract.deployTransaction.wait();
	console.log("Status: ", receipt["status"]);
	console.log("Hash: ", receipt["transactionHash"]);
	if (receipt["status"] == 1) {
		let todo = {
			dataSource: "Cluster0",
			database: "aeropad",
			collection: "Launchpad",
			"document": {
				"name": cname,
				"address": document.querySelector("#smartcontract").value,
				"minimum": cminbuy,
				"maximum": cmaxbuy,
				"rate": crate,
				"Hardcap": charcap,
				"softcap": socp,
				"presale": contract.address,
				"imagelink": img,
				"devAddress": dev
			}
		};

		//document.querySelector("#load_approve").textContent = "Success";
		fetch('https://proxy.aerochain.id/https://data.mongodb-api.com/app/data-yzwpa/endpoint/data/beta/action/insertOne', {
			method: 'post',
			body: JSON.stringify(todo),
			headers: {
				'Access-Control-Request-Headers': '*',
				'Content-Type': 'application/json',
				"api-key": "yCbqe7v2kKidNosqMrKZwB8FZKUMjbXLCPAEGDRjM5PpUeBjS3Ll4UGhNGkL7AAF"
			}
		});
		console.log(":)");
	} else {
		//document.querySelector("#load_approve").textContent = "Failed";
	}
	toggleLoader();
}