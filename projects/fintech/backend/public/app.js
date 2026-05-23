function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)
}

function renderAccounts(accounts) {
  const container = document.getElementById('account-list')
  container.innerHTML = ''

  accounts.forEach(account => {
    const card = document.createElement('article')
    card.className = 'account-card'
    card.innerHTML = `
      <div class="account-card-top">
        <p class="account-type">${account.type}</p>
        <span class="chip" style="background:${account.color}33; color:${account.color};">${account.currency}</span>
      </div>
      <p class="account-number">${account.number}</p>
      <p class="account-balance">${formatCurrency(account.balance)}</p>
    `
    container.appendChild(card)
  })
}

function renderTransactions(transactions) {
  const tbody = document.getElementById('transaction-body')
  tbody.innerHTML = ''

  transactions.forEach(tx => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.description}</td>
      <td class="amount ${tx.type === 'credit' ? 'positive' : 'negative'}">${formatCurrency(tx.amount)}</td>
    `
    tbody.appendChild(row)
  })
}

let spendingChart = null
let activeTrend = 'daily'
let activeAccount = 'current'

function createSpendingChart(labels, values, label) {
  const ctx = document.getElementById('spending-chart')
  if (!ctx) return

  if (spendingChart) {
    spendingChart.data.labels = labels
    spendingChart.data.datasets[0].data = values
    spendingChart.data.datasets[0].label = label
    spendingChart.update()
    return
  }

  spendingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label,
          data: values,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.18)',
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointBackgroundColor: '#2563eb',
          pointHoverRadius: 7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#475569' }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(148, 163, 184, 0.22)' },
          ticks: {
            color: '#475569',
            callback: value => `$${value}`
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
          }
        }
      }
    }
  })
}

function renderSpendingChart(trend, type) {
  const labels = trend.map(point => point.date)
  const values = trend.map(point => Math.abs(point.amount))
  const label = type === 'monthly'
    ? 'Monthly spending'
    : `${activeAccount === 'saving' ? 'Saving' : 'Current'} account daily spending`
  createSpendingChart(labels, values, label)
}

function setActiveTrend(type, data) {
  activeTrend = type
  document.querySelectorAll('.toggle-button').forEach(button => {
    if (button.dataset.trend) {
      button.classList.toggle('active', button.dataset.trend === type)
    }
  })
  const accountToggle = document.getElementById('account-toggle')
  if (accountToggle) {
    accountToggle.style.display = type === 'daily' ? 'inline-flex' : 'none'
  }
  if (type === 'daily') {
    const trendKey = activeAccount === 'saving' ? 'dailyTrendSaving' : 'dailyTrendCurrent'
    renderSpendingChart(data[trendKey], type)
  } else {
    renderSpendingChart(data.monthlyTrend, type)
  }
}

function setupTrendToggle(data) {
  document.querySelectorAll('.toggle-button').forEach(button => {
    if (button.dataset.trend) {
      button.addEventListener('click', () => setActiveTrend(button.dataset.trend, data))
    }
    if (button.dataset.account) {
      button.addEventListener('click', () => {
        activeAccount = button.dataset.account
        document.querySelectorAll('#account-toggle .toggle-button').forEach(accountButton => {
          accountButton.classList.toggle('active', accountButton.dataset.account === activeAccount)
        })
        if (activeTrend === 'daily') {
          const trendKey = activeAccount === 'saving' ? 'dailyTrendSaving' : 'dailyTrendCurrent'
          renderSpendingChart(data[trendKey], 'daily')
        }
      })
    }
  })
  setActiveTrend(activeTrend, data)
}

async function loadDashboard() {
  try {
    const response = await fetch('/api/dashboard')
    const data = await response.json()

    document.getElementById('total-balance').textContent = formatCurrency(data.totalBalance)
    document.getElementById('overview-balance').textContent = formatCurrency(data.totalBalance)
    document.getElementById('overview-income').textContent = formatCurrency(data.monthlyIncome)
    document.getElementById('overview-spending').textContent = formatCurrency(data.monthlySpending)
    document.getElementById('overview-credit').textContent = formatCurrency(data.availableCredit)

    renderAccounts(data.accounts)
    renderTransactions(data.recentTransactions)
    setupTrendToggle(data)
  } catch (err) {
    console.error(err)
  }
}

loadDashboard()
