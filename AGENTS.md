# Repository Instructions

Start with `PROJECT.md` and `.doctrine/project.json` before changing this
repository. They define the project goal, lifecycle, boundaries, public
surfaces, delivery model, and adoption gaps.

Use `SylphxAI/doctrine` for enterprise standards. This is a maintenance examples
repository; canonical platform and SDK behavior belongs in `SylphxAI/platform`.

For control-plane-only changes, validate with:

```bash
python3 /Users/kyle/.doctrine/scripts/project-control-plane-audit.py --local . --fail-on-drift --json
git diff --check
```

Do not add new production platform behavior here. If legacy deployment workflows
are changed or used, include image/tag, deployment readback, and smoke evidence.
