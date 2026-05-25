# Rstar Full-Stack Developer Portfolio Workspace

This workspace contains multiple frontend and backend demo projects for portfolio and app prototypes.

## Included projects

- `portfolio-site` — React + Vite portfolio site.
- `projects/analytics` — analytics dashboard with Express backend serving a static dashboard.
- `projects/fintech/backend` — fintech dashboard demo with Express API and static React-like frontend.
- `projects/ecommerce/backend` — ecommerce storefront demo with Express backend and static frontend.
- `projects/task-management-app` — static task management landing page demo.

## Setup

Install dependencies for each project that includes a `package.json` file.

```bash
cd portfolio-site
npm install

cd ../projects/analytics/backend
npm install

cd ../fintech/backend
npm install

cd ../ecommerce/backend
npm install
```

## Run locally

### Portfolio site

```bash
cd portfolio-site
npm run dev
```

Default URL:

- `http://localhost:5173/`

### Analytics dashboard

```bash
cd projects/analytics/backend
npm start
```

Default URL:

- `http://localhost:4004/`

### Fintech app

```bash
cd projects/fintech/backend
npm start
```

Default URL:

- `http://localhost:4001/`

### Ecommerce app

```bash
cd projects/ecommerce/backend
npm start
```

Default URL:

- `http://localhost:4002/`

### Task management demo

This demo is a plain static site. Open `projects/task-management-app/index.html` directly, or serve it with a static server / VS Code Live Server.

## Notes

- Each backend project uses Express and serves its static frontend from the `public` folder.
- If you need to change the port, set the `PORT` environment variable before running `npm start`.
- Use a browser to verify the site is available after starting the local server.
