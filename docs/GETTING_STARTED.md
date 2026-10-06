# Getting started

Install Node.js 22.18+ or 24, then run `npm ci` and `npm run dev`. Open http://localhost:5173.

Run `npm run check` before submitting a change. Run `npm run build` to generate a production build and `npm run start` to serve it.

The inbox retains local workflow state in browser storage. This is not a shared backend. See [Architecture](ARCHITECTURE.md) for service boundaries and [CI](CI.md) for automated checks.
