# sdk-examples

`sdk-examples` is a maintenance tooling repository that preserves legacy Sylphx
SDK example snippets and deployment workflow examples. The canonical platform
and SDK direction lives in `SylphxAI/platform`; this repository should not grow
new platform semantics or become the source of truth for SDK behavior.

## Lifecycle And Layer

- Lifecycle: `maintenance`
- Layer: `tooling`

## Goals

- Preserve simple SDK usage examples for auth, jobs, storage, and container
  deployment reference.
- Keep legacy deployment workflow examples understandable while the canonical
  implementation lives elsewhere.
- Make the repository's legacy/stub status explicit to agents and audits.

## Non-Goals

- Own the canonical Sylphx SDK, platform API, deploy engine, or product docs.
- Own enterprise doctrine, org rulesets, or shared CI/release policy.
- Add new production platform behavior through examples or workflow snippets.

## Boundaries

This repository owns examples only. Production SDK contracts, platform runtime
semantics, and commercial product behavior belong in their owning repositories,
primarily `SylphxAI/platform`.

## Public Surfaces

- `README.md` documents the legacy example context.
- `examples/` contains TypeScript example snippets.
- `Dockerfile.example` is a deployment example.
- `.github/workflows/deploy-staging.yml` and
  `.github/workflows/deploy-production.yml` are legacy deployment workflow
  examples.
- `.doctrine/project.json` is the machine-readable project manifest.

## Delivery

This repository has legacy deployment workflows but no pull-request CI. Do not
treat these examples as canonical production deployment policy. Any change that
affects live Coolify deployment usage requires runtime rollback or forward-fix
evidence.

The authoritative control-plane record is `.doctrine/project.json`.
