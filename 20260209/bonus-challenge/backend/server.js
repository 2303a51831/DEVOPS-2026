const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for communication with the frontend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Sample data for total income and expenses
const dashboardData = {
  totalIncome: 5000,
  totalExpenses: 3000,
};

/**
 * GET /api/dashboard
 * Fetches dashboard summary data (income, expenses, balance)
 * Returns JSON with calculated balance
 */
app.get('/api/dashboard', (req, res) => {
  const balance = dashboardData.totalIncome - dashboardData.totalExpenses;
  res.json({
    totalIncome: dashboardData.totalIncome,
    totalExpenses: dashboardData.totalExpenses,
    balance: balance
  });
});

/**
 * POST /api/dashboard/refresh
 * Refreshes dashboard data (can be used for manual refresh with updated data)
 */
app.post('/api/dashboard/refresh', (req, res) => {
  // In a real application, you would fetch updated data from a database
  const balance = dashboardData.totalIncome - dashboardData.totalExpenses;
  res.json({
    totalIncome: dashboardData.totalIncome,
    totalExpenses: dashboardData.totalExpenses,
    balance: balance,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Backend server running on http://localhost:${port}`);
  console.log(`📊 Dashboard endpoint: GET http://localhost:${port}/api/dashboard`);
});
