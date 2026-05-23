const tasks = [
  {
    id: 1,
    title: 'Finalize product requirements',
    owner: 'Ava Reed',
    due: '2026-05-25',
    priority: 'High',
    status: 'In progress',
    description: 'Confirm the final scope for the launch sprint and align stakeholders.'
  },
  {
    id: 2,
    title: 'Design homepage mockup',
    owner: 'Noah Kim',
    due: '2026-05-27',
    priority: 'Medium',
    status: 'Pending',
    description: 'Create polished visual designs for the landing page and CTA sections.'
  },
  {
    id: 3,
    title: 'Set up user testing flow',
    owner: 'Mia Chen',
    due: '2026-05-28',
    priority: 'Medium',
    status: 'Pending',
    description: 'Define the testing workflow for the first round of user interviews.'
  },
  {
    id: 4,
    title: 'Review technical backlog',
    owner: 'Liam Brooks',
    due: '2026-05-24',
    priority: 'High',
    status: 'In progress',
    description: 'Prioritize the next sprint tickets and remove any outdated items.'
  }
];

const milestones = [
  { title: 'Kickoff complete', due: 'May 18', status: 'Done' },
  { title: 'Prototype review', due: 'May 24', status: 'In progress' },
  { title: 'Launch readiness', due: 'June 1', status: 'Pending' }
];

const state = {
  tasks: [...tasks]
};

function formatDate(value) {
  const date = new Date(value)
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
}

function updateOverview() {
  const activeCount = state.tasks.filter(task => task.status !== 'Done').length
  const completedCount = state.tasks.filter(task => task.status === 'Done').length
  const dueCount = state.tasks.filter(task => {
    const dueDate = new Date(task.due)
    const now = new Date()
    const diff = (dueDate - now) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 3 && task.status !== 'Done'
  }).length
  const progress = Math.round((completedCount / state.tasks.length) * 100)

  document.getElementById('active-count').textContent = activeCount
  document.getElementById('completed-count').textContent = completedCount
  document.getElementById('due-count').textContent = dueCount
  document.getElementById('progress-count').textContent = `${progress}%`
}

function createTaskCard(task) {
  const card = document.createElement('article')
  card.className = `task-card ${task.status === 'Done' ? 'completed' : ''}`
  card.innerHTML = `
    <div class="task-top">
      <div>
        <h3 class="task-title">${task.title}</h3>
        <div class="task-meta">
          <span class="task-tag">${task.owner}</span>
          <span class="task-tag">${formatDate(task.due)}</span>
          <span class="task-tag">${task.priority}</span>
        </div>
      </div>
      <button class="btn-text" data-id="${task.id}">${task.status === 'Done' ? 'Undo' : 'Complete'}</button>
    </div>
    <p>${task.description}</p>
  `

  const actionBtn = card.querySelector('button')
  actionBtn.addEventListener('click', () => toggleTaskStatus(task.id))

  return card
}

function renderTasks() {
  const list = document.getElementById('task-list')
  list.innerHTML = ''
  const displayTasks = state.tasks.sort((a, b) => new Date(a.due) - new Date(b.due))
  displayTasks.forEach(task => list.appendChild(createTaskCard(task)))
}

function renderMilestones() {
  const list = document.getElementById('milestone-list')
  list.innerHTML = ''
  milestones.forEach(item => {
    const li = document.createElement('li')
    li.className = 'milestone-item'
    li.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.status} • due ${item.due}</p>
    `
    list.appendChild(li)
  })
}

function toggleTaskStatus(taskId) {
  state.tasks = state.tasks.map(task => {
    if (task.id === taskId) {
      return {
        ...task,
        status: task.status === 'Done' ? 'In progress' : 'Done'
      }
    }
    return task
  })
  refreshDashboard()
}

function addTask(event) {
  event.preventDefault()
  const title = document.getElementById('task-title').value.trim()
  const owner = document.getElementById('task-owner').value.trim() || 'Unassigned'
  const due = document.getElementById('task-due').value
  const priority = document.getElementById('task-priority').value

  if (!title || !due) return

  const newTask = {
    id: Date.now(),
    title,
    owner,
    due,
    priority,
    status: 'Pending',
    description: 'New task added to the project board.'
  }

  state.tasks.push(newTask)
  document.getElementById('task-form').reset()
  refreshDashboard()
}

function refreshDashboard() {
  updateOverview()
  renderTasks()
}

function init() {
  document.getElementById('task-form').addEventListener('submit', addTask)
  document.getElementById('show-all').addEventListener('click', () => {
    state.tasks = state.tasks.map(task => ({ ...task, status: task.status === 'Done' ? 'Done' : 'In progress' }))
    refreshDashboard()
  })
  renderMilestones()
  refreshDashboard()
}

init()
