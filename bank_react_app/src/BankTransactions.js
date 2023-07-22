import React, { useState } from 'react';
import './BankTransactions.css'

const BankTransactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Groceries', amount: -50 },
    { id: 2, description: 'Salary', amount: 1000 },
    { id: 3, description: 'Dinner with friends', amount: -30 },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: 0,
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a unique id for the new transaction.
    const newId = Math.max(...transactions.map((transaction) => transaction.id)) + 1;
    setTransactions([...transactions, { ...newTransaction, id: newId }]);
    setNewTransaction({ description: '', amount: 0 });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bank-transactions-container">
      <h1>Bank Transactions</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Transaction</button>
      </form>

      <input type="text" placeholder="Search by description" onChange={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankTransactions;