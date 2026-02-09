# Backend - Bonus Challenge

## Overview
Backend server for the Personal Finance Tracker with bonus challenge features.

## Features Implemented
- ✅ GET `/api/dashboard` - Fetch dashboard summary with calculated balance
- ✅ POST `/api/dashboard/refresh` - Refresh dashboard data with timestamp
- ✅ CORS enabled for frontend communication
- ✅ Error handling middleware
- ✅ JSON response formatting

## Setup & Run

### Installation
```bash
npm install
```

### Start Server
```bash
npm start
```

Expected output:
```
✅ Backend server running on http://localhost:5000
📊 Dashboard endpoint: GET http://localhost:5000/api/dashboard
```

## API Endpoints

### GET /api/dashboard
Fetches the dashboard summary data including income, expenses, and calculated balance.

**Response:**
```json
{
  "totalIncome": 5000,
  "totalExpenses": 3000,
  "balance": 2000
}
```

### POST /api/dashboard/refresh
Refreshes dashboard data (returns the same data with current timestamp).

**Response:**
```json
{
  "totalIncome": 5000,
  "totalExpenses": 3000,
  "balance": 2000,
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

## Key Components

### Server Configuration
- **Port**: 5000
- **CORS**: Enabled for all origins
- **JSON Parsing**: Enabled

### Data Structure
```javascript
{
  totalIncome: 5000,     // Total income amount
  totalExpenses: 3000,   // Total expenses amount
  balance: 2000          // Calculated: income - expenses
}
```

## Dependencies

- **express**: Web framework
- **cors**: Enable CORS for frontend communication

## Development

For development with auto-reload:
```bash
npm install --save-dev nodemon
npm run dev
```

## Bonus Challenge Features

This backend supports:
1. **Refresh Functionality** - Frontend can fetch updated data on demand
2. **Currency Formatting** - Backend provides numeric values, frontend formats them
3. **Balance Calculation** - Automatically calculates balance (income - expenses)
4. **Timestamp Tracking** - Returns ISO timestamp for data refresh

## Notes

- In production, data should be fetched from a database
- Add authentication/authorization as needed
- Implement rate limiting to prevent abuse
- Consider caching strategies for performance
