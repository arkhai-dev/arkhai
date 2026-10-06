# Architecture

| Layer | Implementation | Boundary |
| --- | --- | --- |
| Routes | React pages through Vinext and Vite | Website presentation |
| Workflow engine | Browser-local transitions and stored state | No durable shared service |
| Conveyor | Procedural geometry and timed motion | Visual explanation of workflow stages |
| Tests | Node built-in test runner | Deterministic behavior and movement constraints |

Workflow tests check approval roles, invalidation after proposal changes, expiry, rejected decisions, and duplicate execution. Motion tests check stage timing and clearance before a message passes the approval gate.

The website does not provision email accounts, deliver mail, verify senders, run agents, or execute purchases. Production integration needs a real email transport, authenticated users and senders, durable threads, job queues, signed callbacks, replay protection, server-enforced approvals, and an audit log.

See [the README](../README.md) and [CI](CI.md).
