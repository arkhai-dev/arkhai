# Local validation

Validated on 2026-10-06 using Node.js v24.19.0 and the committed dependency lockfile.

| Check | Result |
| --- | --- |
| `npm ci` | Dependencies installed successfully. |
| `npm run typecheck` | Passed. |
| `npm run test:workflows` | 14 checks passed. |
| `npm run test:motion` | 2 tests passed. |
| `npm run check:docs` | Links, npm commands, and banner passed. |
| `npm run check:hygiene` | Secret patterns and workflow configuration passed. |
| `npm run build` | Production build passed for all eight routes. |
| `npm run start` | Production server started successfully. |

Production HTTP smoke checks returned 200 for the landing, platform, explore, and whitepaper pages. The build reports large client chunks; this is a performance warning, not a failed build. Browser rendering and real external service behavior were not verified by these checks.

Hosted GitHub Actions have not run yet. Node.js 22 is included in the hosted matrix but was not available for local verification.
