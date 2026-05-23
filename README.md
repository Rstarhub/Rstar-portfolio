# Full-Stack Developer Portfolio Workspace

This workspace contains a portfolio site and two example full-stack projects:

- `portfolio-site` — a small React + Vite portfolio you can customize.
- `projects/fintech` — example fintech project (Express backend serving static frontend).
- `projects/ecommerce` — example ecommerce project (Express backend serving static frontend).

Quick start (from workspace root):

1. Install dependencies for each project:

```bash
cd portfolio-site
npm install

cd ../projects/fintech/backend
npm install

cd ../ecommerce/backend
npm install
```

2. Run the portfolio dev server:

```bash
cd portfolio-site
npm run dev
```

3. Start example project servers (each serves its own frontend):

```bash
cd projects/fintech/backend
npm start

cd ../ecommerce/backend
npm start
```

Open the portfolio at the URL printed by `npm run dev`, and the project frontends at:

- Fintech: http://localhost:4001
- Ecommerce: http://localhost:4002

Customize components, styles, and APIs to build out your portfolio.
