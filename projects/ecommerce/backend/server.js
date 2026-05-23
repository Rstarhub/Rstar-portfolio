const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4002

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=80',
    shipping: 'Free shipping',
    bids: 24,
    description: 'Noise-canceling over-ear headphones with crystal-clear sound and 30h battery life.'
  },
  {
    id: 2,
    name: 'Modern Desk Lamp',
    price: 49.5,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80',
    shipping: 'Ships next day',
    bids: 12,
    description: 'Adjustable LED lamp with warm light and sleek matte finish for modern workspaces.'
  },
  {
    id: 3,
    name: 'Vintage Leather Backpack',
    price: 129.0,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    shipping: 'Free returns',
    bids: 8,
    description: 'Handcrafted full-grain leather backpack built for travel, work, and everyday style.'
  },
  {
    id: 4,
    name: 'Smartwatch Fitness Pro',
    price: 249.99,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80',
    shipping: 'Free shipping',
    bids: 42,
    description: 'Track workouts, heart rate, sleep, and notifications with premium smartwatch features.'
  },
  {
    id: 5,
    name: 'Minimalist Office Chair',
    price: 339.95,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    shipping: 'Fast delivery',
    bids: 18,
    description: 'Ergonomic office chair with lumbar support, breathable mesh, and polished details.'
  },
  {
    id: 6,
    name: 'Collector Drone Kit',
    price: 499.0,
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80',
    shipping: 'Free shipping',
    bids: 32,
    description: 'Ready-to-fly quadcopter kit with 4K camera and precision controls for aerial creatives.'
  }
]

const projects = [
  {
    id: 1,
    title: 'Modular Smart Home Hub',
    description: 'A customizable home automation kit for lighting, security, and energy management.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
    category: 'Innovation',
    price: 89.0
  },
  {
    id: 2,
    title: 'Artisan Craft Coffee Set',
    description: 'Coffee brewing project featuring handcrafted ceramics and specialty blends.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    category: 'Lifestyle',
    price: 39.5
  },
  {
    id: 3,
    title: 'Urban Adventure Backpack',
    description: 'A versatile travel pack designed for city explorers and weekend trips.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    category: 'Outdoor',
    price: 119.99
  },
  {
    id: 4,
    title: 'Premium Desk Productivity Kit',
    description: 'A curated bundle of desk essentials for designers, developers, and creators.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    category: 'Workspace',
    price: 74.0
  }
]

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/projects', (req, res) => {
  res.json(projects)
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => console.log(`Ecommerce app running on http://localhost:${PORT}`))
