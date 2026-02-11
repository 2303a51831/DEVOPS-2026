import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const getTransactionType = (category) => {
    const incomeCategories = ["Salary", "Business", "Investment"];
    return incomeCategories.includes(category) ? "income" : "expense";
  };

  const addTransaction = () => {
    if (!amount) return;

    const type = getTransactionType(category);

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      category,
      type
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1>💰 Finance Dashboard</h1>

      <div className="summary">
        <div className="card balance-card">
          Balance<br />₹{balance}
        </div>
        <div className="card income-card">
          Income<br />₹{income}
        </div>
        <div className="card expense-card">
          Expense<br />₹{expense}
        </div>
      </div>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Salary</option>
        <option>Business</option>
        <option>Investment</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
      </select>

      <button
        onClick={addTransaction}
        className={
          getTransactionType(category) === "income"
            ? "add-income"
            : "add-expense"
        }
      >
        Add {getTransactionType(category) === "income" ? "Income" : "Expense"}
      </button>

      <div className="transactions">
        {transactions.map((t) => (
          <div
            key={t.id}
            className={`transaction-item ${
              t.type === "income"
                ? "transaction-income"
                : "transaction-expense"
            }`}
          >
            <span>
              {t.category} - ₹{t.amount}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTransaction(t.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
