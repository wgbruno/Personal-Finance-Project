import { useEffect, useState } from 'react';
import { getTransactions } from '../api/api';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    const result = await getTransactions();
    if (result.success) {
      setTransactions(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map(tx => (
            <li key={tx.id}>
              {tx.type}: ${tx.amount} — {tx.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
