## @superset-ui/plugin-chart-drilldown-map-coord

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-drilldown-map-coord.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-drilldown-map-coord)

This plugin provides Drilldown Map Coordinate for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import DrilldownMapCoordChartPlugin from '@superset-ui/plugin-chart-drilldown-map-coord';

new DrilldownMapCoordChartPlugin()
  .configure({ key: 'drilldown-map-coord' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-drilldown-map-coord) for more details.

```js
<SuperChart
  chartType="drilldown-map-coord"
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
│   ├── DrilldownMapCoord.tsx
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