## @superset-ui/plugin-chart-peta-sdbi

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-peta-sdbi.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-peta-sdbi)

This plugin provides Peta Sdbi for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import PetaSdbiChartPlugin from '@superset-ui/plugin-chart-peta-sdbi';

new PetaSdbiChartPlugin()
  .configure({ key: 'peta-sdbi' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-peta-sdbi) for more details.

```js
<SuperChart
  chartType="peta-sdbi"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── PetaSdbi.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```