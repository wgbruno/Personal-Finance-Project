import { useState } from 'react';
import { addTransaction } from '../api/api';

export default function AddTransactionForm({ onAdded }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    const result = await addTransaction({ amount, type, description });

    if (result.success) {
      setAmount('');
      setDescription('');
      setError(null);
      onAdded();
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}
