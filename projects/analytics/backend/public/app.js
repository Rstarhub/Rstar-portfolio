function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

const metrics = {
  revenue: 215000,
  sessions: 48200,
  conversion: 7.4,
  engagement: '05m 38s',
  users: 18240,
  churn: 3.8
}

const revenueTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  values: [112000, 124500, 138000, 148000, 162500, 178000, 215000]
}

const trafficSources = {
  labels: ['Organic', 'Paid', 'Referral', 'Direct'],
  values: [46, 28, 15, 11]
}

const segments = [
  { name: 'Enterprise', users: 8200, revenue: 120000, conversion: '9.4%', change: '+14.2%' },
  { name: 'SMBs', users: 5600, revenue: 62000, conversion: '6.8%', change: '+7.5%' },
  { name: 'Freelancers', users: 3440, revenue: 33000, conversion: '4.1%', change: '+9.3%' }
]

function renderMetrics() {
  document.getElementById('revenue-value').textContent = formatCurrency(metrics.revenue)
  document.getElementById('sessions-value').textContent = metrics.sessions.toLocaleString()
  document.getElementById('conversion-value').textContent = `${metrics.conversion}%`
  document.getElementById('engagement-value').textContent = metrics.engagement
  document.getElementById('users-count').textContent = metrics.users.toLocaleString()
  document.getElementById('conversion-count').textContent = `${metrics.conversion}%`
  document.getElementById('churn-count').textContent = `${metrics.churn}%`
}

function createRevenueChart() {
  const ctx = document.getElementById('revenue-chart').getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: revenueTrend.labels,
      datasets: [{
        label: 'Revenue',
        data: revenueTrend.values,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.16)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(148, 163, 184, 0.16)' },
          ticks: { callback: value => `$${value / 1000}k` }
        }
      }
    }
  })
}

function createTrafficChart() {
  const ctx = document.getElementById('traffic-chart').getContext('2d')
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: trafficSources.labels,
      datasets: [{
        data: trafficSources.values,
        backgroundColor: ['#2563eb', '#0ea5e9', '#14b8a6', '#8b5cf6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, padding: 16 }
        }
      }
    }
  })
}

function renderSegments() {
  const tbody = document.getElementById('segment-table')
  tbody.innerHTML = segments.map(segment => `
    <tr>
      <td>${segment.name}</td>
      <td>${segment.users.toLocaleString()}</td>
      <td>${formatCurrency(segment.revenue)}</td>
      <td>${segment.conversion}</td>
      <td>${segment.change}</td>
    </tr>
  `).join('')
}

function init() {
  renderMetrics()
  createRevenueChart()
  createTrafficChart()
  renderSegments()
}

init()
