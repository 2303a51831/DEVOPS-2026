import React, { useState, useEffect } from 'react';
import { formatCurrency } from './currencyFormatter';

/**
 * Enhanced Dashboard Component with Bonus Features
 * - Refresh data without page reload
 * - Display formatted currency values
 */
const DashboardBonus = () => {
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="dashboard-bonus">
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <button 
          onClick={handleRefresh} 
          disabled={loading}
          className="refresh-btn"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {lastUpdated && (
        <p className="last-updated">Last updated: {lastUpdated}</p>
      )}

      {error && (
        <div className="error-message">
          ⚠️ Error: {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          ⏳ Loading dashboard data...
        </div>
      )}

      <div className="dashboard-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p className="amount">{formatCurrency(dashboardData.totalIncome)}</p>
        </div>

        <div className="card expenses">
          <h3>Total Expenses</h3>
          <p className="amount">{formatCurrency(dashboardData.totalExpenses)}</p>
        </div>

        <div className="card balance">
          <h3>Balance</h3>
          <p className={`amount ${dashboardData.balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(dashboardData.balance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardBonus;
