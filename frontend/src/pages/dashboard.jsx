import { useState } from 'react';
import AddTransactionForm from '../components/addTransactionForm';
import TransactionList from '../components/transactionList';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  const handleAdded = () => setRefresh(prev => !prev);

  return (
    <div>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
      <h2>Dashboard</h2>
      <AddTransactionForm onAdded={handleAdded} />
      <TransactionList key={refresh} />
    </div>
  );
}
