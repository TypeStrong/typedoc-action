*Is a WIP; is not usable in its current form*

# Usage

Create a new file `.github/workflows/typedoc.yml` with the following contents:

```yaml
name: Publish Typedoc to Github Pages
on:
  push:
    branches:
      - main
      - master
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: TypeStrong/typedoc-action@v1
        with:
          args: --entrypoints src/index.ts
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
