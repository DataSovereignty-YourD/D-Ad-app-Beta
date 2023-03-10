import * as solanaWeb3 from "@solana/web3.js";


const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL;

const createConnection = () => {
	return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
};

const getTestKeypair = () => {
	let secretKey = Uint8Array.from([171, 205, 86, 176, 199, 143, 115, 95, 112, 14, 208, 92, 5, 249, 28, 233, 52, 20, 241, 250, 191, 193, 144, 191, 19, 123, 5, 236, 0, 68, 31, 179, 79, 117, 227, 38, 218, 163, 229, 164, 6, 136, 72, 228, 183, 211, 195, 44, 22, 212, 247, 79, 64, 111, 85, 10, 31, 1, 61, 178, 15, 195, 56, 126]
	);

	return solanaWeb3.Keypair.fromSecretKey(secretKey);
}

const getBalance = async (publicKey) => {
	try {
		const connection = createConnection();
		const _publicKey = publicKeyFromString(publicKey);
		const lamports = await connection.getBalance(_publicKey);
		if (lamports != null) {
			return lamports / LAMPORTS_PER_SOL;
		} else {
			return 0;
		}
	} catch (err) {
		console.error(`Error: ${err}`);
		return 0;
	}
};

const getTransactions = async (numTx, publicKey) => {
  const connection = createConnection();

	const _publicKey = publicKeyFromString(publicKey);

  let transactionList = await connection.getSignaturesForAddress(_publicKey, {
    limit: numTx,
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

	await connection.requestAirdrop(
		publicKeyFromString(publicKeyString),
		LAMPORTS_PER_SOL
	);

};


export {
	LAMPORTS_PER_SOL,
	createConnection,
	getBalance,
	getSolanaPrice,
	publicKeyFromString,
	requestAirdrop,
	getTestKeypair,
	getTransactions,
};