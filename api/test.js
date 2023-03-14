const solanaWeb3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const base58 = require("bs58")

// import { createMint, mintTo } from "@solana/spl-token"

const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL;

const createConnection = () => {
	return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
};

const getTestKeypair = () => {
	let secretKey = Uint8Array.from([171, 205, 86, 176, 199, 143, 115, 95, 112, 14, 208, 92, 5, 249, 28, 233, 52, 20, 241, 250, 191, 193, 144, 191, 19, 123, 5, 236, 0, 68, 31, 179, 79, 117, 227, 38, 218, 163, 229, 164, 6, 136, 72, 228, 183, 211, 195, 44, 22, 212, 247, 79, 64, 111, 85, 10, 31, 1, 61, 178, 15, 195, 56, 126]
	);

	return solanaWeb3.Keypair.fromSecretKey(secretKey);
}

const getCATBalance = async (publicKey) => {
	try {
		const connection = createConnection();
		const _publicKey = publicKeyFromString(publicKey);
		const accounts = await connection.getParsedProgramAccounts(
			publicKeyFromString("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
			{
				filters: [
					{
						dataSize: 165, // number of bytes
					},
					{
						memcmp: {
							offset: 32, // number of bytes
							bytes: publicKey, // base58 encoded string
						},
					},
				],
			}
		);

		console.log(
			`Found ${accounts.length} token account(s) for wallet ${publicKey}: `
		);
		accounts.forEach((account, i) => {
			console.log(
				`-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
			);
			console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
			console.log(
				`Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
			);

			return account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
		});
		
		console.log(accounts[0].account.data["parsed"]["info"]["tokenAmount"]["uiAmount"])

	} catch (err) {
		console.error(`Error: ${err}`);
		return 0;
	}
};

const getTransactions = async (numTx, publicKey) => {
	const connection = createConnection();

	const _publicKey = publicKeyFromString(publicKey);

	let transactionList = await connection.getSignaturesForAddress(_publicKey, {
		limit: Math.min(numTx, 50), // limit 값을 numTx와 1000 중 작은 값으로 설정
	});

	let signatureList = transactionList.map(
		(transaction) => transaction.signature
	);
	let transactionDetails = await connection.getParsedTransactions(
		signatureList
	);

	const result = {
		numTransactions: transactionList.length,
		transactions: [],
	};

	transactionList.forEach((transaction, i) => {
		const date = new Date(transaction.blockTime * 1000);
		const transactionInstructions =
			transactionDetails[i].transaction.message.instructions;

		const tx = {
			transactionNo: i + 1,
			signature: transaction.signature,
			time: date,
			status: transaction.confirmationStatus,
			instructionsInfo: [],
		};

		transactionInstructions.forEach((instruction, n) => {
			tx.instructionsInfo.push({
				parsed: instruction.parsed.info,
			});
		});

		result.transactions.push(tx);


		
		
	});

	console.log(result.transactions[0].instructionsInfo[0].parsed / LAMPORTS_PER_SOL)


	return result;
};

const getSolanaPrice = async () => {
	const response = await fetch(
		`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
		{
			method: "GET",
		}
	);

	const data = await response.json();
	return data.solana.usd;
};

const publicKeyFromString = (publicKeyString) => {
	return new solanaWeb3.PublicKey(publicKeyString);
};

const requestAirdrop = async (publicKeyString) => {
	const connection = createConnection();

	try {
		await connection.requestAirdrop(
			publicKeyFromString(publicKeyString),
			LAMPORTS_PER_SOL
		);
	} catch (err) {
		throw new Error(`Failed to request airdrop: ${err.message}`);
	}

};

const mintCATTo = async (destination, amount) => {
	const connection = createConnection();

	try {
		await mintTo({
			connection: connection,
			payer: getTestKeypair(), // 트렌젝션 송신자 계정
			mint: publicKeyFromString("6V26iu4YCsCdHWhMpgUgyY3x79MdYALxAwsfKhUxbZFB"), // SPL 토큰 계정
			destination: publicKeyFromString(destination), // 토큰을 받을 수신자 계정
			authority: getTestKeypair(),
			amount: amount,
		})
	} catch (err) {
		throw new Error(`Failed to mint CAT: ${err.message}`);
	}
}

const getKeypairFromsecretKeyString = (secretKeyString) => {
	const secretKey = base58.decode(secretKeyString);
	const keypair = solanaWeb3.Keypair.fromSecretKey(secretKey);

	// console.log(keypair.publicKey.toString());
	return keypair;
}

// 발신계정: 2JkjeCG2mKjiCLwah25Dg78yxwQj5XCQEoUAMTTN3mmk
const fromWalletSecretkey = 'Jo6mgLM9qhKPnwK5L46qKuKNt49r6wCwkR2iRSSZfpidFiuLhfx5SCLSxM5ZYduY7gYaVBVMuN7WRNYokgoVT8N';

// 수신계정: 2CFRPpRoxA7bX5udXPdh8denNHeiSUhoy9Qcm6yyLkND
const toWalletSecretkey = '2v2bCmzap4Yo8HAzgujMNL5sGuhmRZmvfh1z1TNzJZE6kb2ysphBCXB9WWfcZooxuo7e4hUKF1w2brC1Spa6tcx9'


const fromWallet = getKeypairFromsecretKeyString(fromWalletSecretkey);
const toWallet = getKeypairFromsecretKeyString(toWalletSecretkey);

console.log(toWallet.publicKey.toString())

const transferCAT = async (tokenAddress, fromWallet, toWallet, amount) => {
	const connection = createConnection();

	const _publicKey = publicKeyFromString(tokenAddress)

	const fromTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
		connection,
		fromWallet,
		_publicKey,
		fromWallet.publicKey
	);

	const toTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
		connection,
		fromWallet,
		_publicKey,
		toWallet.publicKey
	);

	console.log(fromTokenAccount.address, "fromTokenAccount")
	console.log(toTokenAccount.address, "toTokenAccount")

	console.log("before transfer")
	const signature = await splToken.transfer(
		connection,
		fromWallet,
		fromTokenAccount.address,
		toTokenAccount.address,
		fromWallet.publicKey,
		amount * LAMPORTS_PER_SOL
	);

	console.log(signature.transactions.instructionsInfo[0]);
	return signature;
}

// transferCAT("GzioiHQv2A6Wx2q9XRt5FwsRTUoTjRmgdSugVXF75qiu", fromWallet, toWallet, 1);

// getCATBalance("2CFRPpRoxA7bX5udXPdh8denNHeiSUhoy9Qcm6yyLkND")


getTransactions(3, "Cpntq3raNxVzAsmgvWozRq5maeKvHkwvsp937xY2py4K");
