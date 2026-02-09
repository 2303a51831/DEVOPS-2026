import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardBonus.css';

/**
 * Currency formatter utility
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Dashboard Component with Bonus Features
 * - Refresh data without page reload
 * - Display currency formatted values
 * - Show loading and error states
 */
const DashboardBonus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch dashboard data from backend API
   */
  const fetchDashboardData = async () => {
    setRefreshLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard');
      setData(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Error fetching data: ' + (err.message || 'Unknown error'));
      console.error('Fetch error:', err);
    } finally {
      setRefreshLoading(false);
    }
  };

  /**
   * Fetch data on component mount
   */
  useEffect(() => {
    fetchDashboardData();
    setLoading(false);
  }, []);

  /**
   * Handle refresh button click
   */
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Initial loading state
  if (loading && !data) {
    return <div className="dashboard-loading">⏳ Loading dashboard data...</div>;
  }

  // Error state (when no data)
  if (error && !data) {
    return <div className="dashboard-error">⚠️ {error}</div>;
  }

  return (
    <div className="dashboard-bonus">
      {/* Header with title and refresh button */}
      <div className="dashboard-header">
        <h1>💰 Financial Dashboard</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshLoading}
          className="refresh-btn"
          title="Refresh dashboard data"
        >
          {refreshLoading ? '⏳ Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>

      {/* Last updated timestamp */}
      {lastUpdated && (
        <p className="last-updated">Last updated: {lastUpdated}</p>
      )}

      {/* Error message (if any, but data still exists) */}
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {/* Dashboard cards with financial data */}
      {data && (
        <div className="dashboard-cards">
          {/* Total Income Card */}
          <div className="card income">
            <h3>💹 Total Income</h3>
            <p className="amount">{formatCurrency(data.totalIncome)}</p>
          </div>

          {/* Total Expenses Card */}
          <div className="card expenses">
            <h3>📉 Total Expenses</h3>
            <p className="amount">{formatCurrency(data.totalExpenses)}</p>
          </div>

          {/* Balance Card */}
          <div className="card balance">
            <h3>💳 Balance</h3>
            <p className={`amount ${data.balance >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(data.balance)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBonus;
