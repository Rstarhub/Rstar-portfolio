const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4001

const dashboard = {
  name: 'Rstar Bank',
  totalBalance: 12845.37,
  availableCredit: 4500.0,
  monthlyIncome: 8200.0,
  monthlySpending: 3710.25,
  dailyTrendCurrent: [
    { date: 'May 15', amount: 250.0 },
    { date: 'May 16', amount: 105.0 },
    { date: 'May 17', amount: 80.0 },
    { date: 'May 18', amount: 95.0 },
    { date: 'May 19', amount: 60.0 },
    { date: 'May 20', amount: 120.0 },
    { date: 'May 21', amount: 0.0 }
  ],
  dailyTrendSaving: [
    { date: 'May 15', amount: 200.0 },
    { date: 'May 16', amount: 85.0 },
    { date: 'May 17', amount: 40.0 },
    { date: 'May 18', amount: 85.0 },
    { date: 'May 19', amount: 35.0 },
    { date: 'May 20', amount: 20.0 },
    { date: 'May 21', amount: 0.0 }
  ],
  dailyTrend: [
    { date: 'May 15', amount: 450.0 },
    { date: 'May 16', amount: 190.0 },
    { date: 'May 17', amount: 120.0 },
    { date: 'May 18', amount: 180.0 },
    { date: 'May 19', amount: 95.0 },
    { date: 'May 20', amount: 140.0 },
    { date: 'May 21', amount: 0.0 }
  ],
  monthlyTrend: [
    { date: 'Jan', amount: 3140.0 },
    { date: 'Feb', amount: 3280.0 },
    { date: 'Mar', amount: 2950.0 },
    { date: 'Apr', amount: 3620.0 },
    { date: 'May', amount: 3710.25 }
  ],
  accounts: [
    {
      id: 1,
      type: 'Checking Account',
      number: '•••• 2147',
      balance: 5245.37,
      currency: 'USD',
      color: '#3366ff'
    },
    {
      id: 2,
      type: 'Savings Account',
      number: '•••• 8231',
      balance: 7600.0,
      currency: 'USD',
      color: '#0ea5e9'
    }
  ],
  recentTransactions: [
    { id: 1, date: '2026-05-21', description: 'Salary Deposit', amount: 5200.0, type: 'credit' },
    { id: 2, date: '2026-05-20', description: 'Electricity Bill', amount: -138.55, type: 'debit' },
    { id: 3, date: '2026-05-19', description: 'Grocery Store', amount: -94.75, type: 'debit' },
    { id: 4, date: '2026-05-18', description: 'Food Delivery', amount: -32.40, type: 'debit' },
    { id: 5, date: '2026-05-17', description: 'Online Subscription', amount: -14.99, type: 'debit' }
  ]
}

app.get('/api/dashboard', (req, res) => {
  res.json(dashboard)
})

app.get('/api/accounts', (req, res) => {
  res.json(dashboard.accounts)
})

app.get('/api/transactions', (req, res) => {
  res.json(dashboard.recentTransactions)
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => console.log(`Fintech app running on http://localhost:${PORT}`))
