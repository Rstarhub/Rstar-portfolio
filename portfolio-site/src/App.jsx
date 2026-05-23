import React from 'react'

export default function App() {
  const projects = [
    {
      id: 1,
      title: 'Fintech Dashboard',
      description: 'A real-time financial account dashboard with balance tracking, transaction history, and account management. Built with React, Express, and RESTful APIs.',
      tech: ['React', 'Node.js', 'Express', 'JavaScript'],
      link: 'https://rstar-portfolio-fintech.vercel.app/',
      featured: true,
      image: '💰'
    },
    {
      id: 2,
      title: 'Ecommerce Platform',
      description: 'Full-featured ecommerce storefront with product catalog, shopping cart, and checkout flow. Demonstrates backend API integration and frontend state management.',
      tech: ['React', 'Node.js', 'Express', 'REST API'],
      link: 'https://rstar-portfolio-ecommerce.vercel.app/',
      featured: true,
      image: '🛍️'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, user authentication, and team workspace features.',
      tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
      link: 'https://rstar-portfolio-timemanagementapp.vercel.app/',
      featured: false,
      image: '✓'
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      description: 'Data visualization dashboard with interactive charts, real-time metrics, and custom reporting capabilities.',
      tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      link: 'https://rstar-portfolio-analytics.vercel.app/',
      featured: false,
      image: '📊'
    }
  ]

  const skills = {
    'Frontend': ['React', 'Vue.js', 'HTML/CSS', 'JavaScript/ES6', 'Responsive Design', 'Vite'],
    'Backend': ['Node.js', 'Express', 'RESTful APIs', 'Database Design', 'Authentication'],
    'Databases': ['MongoDB', 'PostgreSQL', 'Firebase', 'SQL'],
    'Tools & Other': ['Git', 'Docker', 'AWS', 'GitHub', 'npm', 'VS Code']
  }

  return (
    <div className="app">
      {/* Navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo">Rstar Web Portfolio</div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Full-Stack Developer</h1>
          <p className="subtitle">Building scalable web applications with modern technologies</p>
          <p className="bio">
            I'm a passionate full-stack developer with expertise in React, Node.js, and cloud technologies. 
            I love creating responsive, user-friendly applications and clean, maintainable code. 
            Always learning, always building.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="mailto:vicroll990@gmail.com?subject=Project%20Inquiry%20-%20Portfolio" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Explore my recent work and technical achievements</p>
          
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
                <div className="project-icon">{project.image}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2>Technical Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
          
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                <ul>
                  {items.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Let's Connect</h2>
          <p className="section-subtitle">I'm open to new opportunities and interesting projects</p>
          
          <div className="contact-links">
            <a href="mailto:vicroll990@gmail.com?subject=Project%20Inquiry%20-%20Portfolio" className="contact-link">
              📧 Email
            </a>
            <a href="https://github.com/Rstarhub" target="_blank" rel="noreferrer" className="contact-link">
              🐙 GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Rstar Full-Stack Developer. All rights reserved.</p>
      </footer>
    </div>
  )
}
