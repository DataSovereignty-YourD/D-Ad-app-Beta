import { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
	const [balance, setBalance] = useState();
	const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async (account) => {
    const response = await fetch('http://localhost:8000/reward/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Account: account }),
    });

    const history = await response.json();
    setTransactions(history);
    setIsLoading(false);
  };

	const fetchBalance = async (account) => {
		const response = await fetch('http://localhost:8000/reward/getbalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Account: account }),
    });

		const balanceData = await response.json(); 
  	setBalance(balanceData); 
  
		setIsLoading(false);
	}

  return (
    <TransactionContext.Provider value={{ balance, transactions, isLoading, fetchTransactions, fetchBalance }}>
      {children}
    </TransactionContext.Provider>
  );
};
