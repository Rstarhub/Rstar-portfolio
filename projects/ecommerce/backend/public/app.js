function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)
}

function createProductCard(product) {
  return `
    <article class="card product-card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="card-content">
        <span class="card-badge">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-meta">
          <span class="price">${formatCurrency(product.price)}</span>
          <span class="chip">${product.shipping}</span>
        </div>
      </div>
    </article>
  `
}

function createProjectCard(project) {
  return `
    <article class="card project-card">
      <img src="${project.image}" alt="${project.title}" />
      <div class="card-content">
        <span class="card-badge">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="product-meta">
          <span class="price">${formatCurrency(project.price)}</span>
          <span class="chip">Curated</span>
        </div>
      </div>
    </article>
  `
}

function renderProducts(products) {
  const grid = document.getElementById('product-grid')
  if (!grid) return
  grid.innerHTML = products.map(createProductCard).join('')
}

function renderProjects(projects) {
  const grid = document.getElementById('project-grid')
  if (!grid) return
  grid.innerHTML = projects.map(createProjectCard).join('')
}

let allProducts = []
let allProjects = []

function filterProducts(query) {
  if (!query) return allProducts
  const q = query.trim().toLowerCase()
  return allProducts.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    )
  })
}

function setupSearch() {
  const input = document.getElementById('search')
  const btn = document.getElementById('search-btn')
  const suggestionsEl = document.getElementById('suggestions')
  if (!input || !btn) return

  const doSearch = () => {
    const results = filterProducts(input.value)
    renderProducts(results)
  }

  // live search on input
  let debounceTimer = null
  let suggestTimer = null
  input.addEventListener('input', () => {
    // suggestions (faster)
    clearTimeout(suggestTimer)
    suggestTimer = setTimeout(() => showSuggestions(input.value), 100)

    // grid update (slower)
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(doSearch, 250)
  })

  // explicit search button
  btn.addEventListener('click', doSearch)
  
  // hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!suggestionsEl) return
    if (!document.getElementById('search').contains(e.target) && !suggestionsEl.contains(e.target)) {
      suggestionsEl.innerHTML = ''
    }
  })
}

function showSuggestions(query) {
  const suggestionsEl = document.getElementById('suggestions')
  if (!suggestionsEl) return
  suggestionsEl.innerHTML = ''
  const q = (query || '').trim()
  if (!q) return

  const matches = filterProducts(q).slice(0, 6)
  if (!matches.length) return

  const list = document.createElement('div')
  list.className = 'suggestions-list'

  matches.forEach(p => {
    const item = document.createElement('div')
    item.className = 'suggestion-item'
    item.innerHTML = `
      <img class="suggestion-thumb" src="${p.image}" alt="${p.name}" />
      <div class="suggestion-meta">
        <div class="suggestion-title">${p.name}</div>
        <div class="suggestion-sub">${p.category} • ${formatCurrency(p.price)}</div>
      </div>
    `
    item.addEventListener('click', () => {
      const input = document.getElementById('search')
      input.value = p.name
      renderProducts([p])
      suggestionsEl.innerHTML = ''
    })
    list.appendChild(item)
  })

  suggestionsEl.appendChild(list)
}

async function loadMarketplace() {
  try {
    const [productRes, projectRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/projects')
    ])

    const [products, projects] = await Promise.all([
      productRes.json(),
      projectRes.json()
    ])

    allProducts = products
    allProjects = projects

    renderProducts(allProducts)
    renderProjects(allProjects)
    setupSearch()
  } catch (err) {
    console.error('Failed to load marketplace data', err)
  }
}

loadMarketplace()
