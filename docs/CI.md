# Continuous integration

| Workflow | Command | Node |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | 22, 24 |
| Workflow behavior | `npm run test:workflows` | 22, 24 |
| Conveyor motion | `npm run test:motion` | 22, 24 |
| Production build | `npm run build` | 22, 24 |
| Documentation | `npm run check:docs` | 24 |
| Repository hygiene | `npm run check:hygiene` | 24 |

Each workflow runs on pushes to main, pull requests, and manual dispatch. Jobs have a 15-minute timeout and read-only contents permission. Actions are pinned to commit SHAs. Failures are not suppressed.

After creating the repository, run `node scripts/configure-repository.mjs OWNER/REPOSITORY` to insert native Actions badges. Their status comes directly from GitHub. Local passing checks do not establish that hosted Actions have passed.

The hygiene check detects specific accidental secrets, deployment-specific files, and unsafe workflow configuration. It is not a security audit or dependency vulnerability scan.
