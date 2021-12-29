/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  emitFilterControl,
  formatSelectOptions,
  sharedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
      * The control panel is split into two tabs: "Query" and
      * "Chart Options". The controls that define the inputs to
      * the chart data request, such as columns and metrics, usually
      * reside within "Query", while controls that affect the visual
      * appearance or functionality of the chart are under the
      * "Chart Options" section.
      *
      * There are several predefined controls that can be used.
      * Some examples:
      * - groupby: columns to group by (tranlated to GROUP BY statement)
      * - series: same as groupby, but single selection.
      * - metrics: multiple metrics (translated to aggregate expression)
      * - metric: sane as metrics, but single selection
      * - adhoc_filters: filters (translated to WHERE or HAVING
      *   depending on filter type)
      * - row_limit: maximum number of rows (translated to LIMIT statement)
      *
      * If a control panel has both a `series` and `groupby` control, and
      * the user has chosen `col1` as the value for the `series` control,
      * and `col2` and `col3` as values for the `groupby` control,
      * the resulting query will contain three `groupby` columns. This is because
      * we considered `series` control a `groupby` query field and its value
      * will automatically append the `groupby` field when the query is generated.
      *
      * It is also possible to define custom controls by importing the
      * necessary dependencies and overriding the default parameters, which
      * can then be placed in the `controlSetRows` section
      * of the `Query` section instead of a predefined control.
      *
      * import { validateNonEmpty } from '@superset-ui/core';
      * import {
      *   sharedControls,
      *   ControlConfig,
      *   ControlPanelConfig,
      * } from '@superset-ui/chart-controls';
      *
      * const myControl: ControlConfig<'SelectControl'> = {
      *   name: 'secondary_entity',
      *   config: {
      *     ...sharedControls.entity,
      *     type: 'SelectControl',
      *     label: t('Secondary Entity'),
      *     mapStateToProps: state => ({
      *       sharedControls.columnChoices(state.datasource)
      *       .columns.filter(c => c.groupby)
      *     })
      *     validators: [validateNonEmpty],
      *   },
      * }
      *
      * In addition to the basic drop down control, there are several predefined
      * control types (can be set via the `type` property) that can be used. Some
      * commonly used examples:
      * - SelectControl: Dropdown to select single or multiple values,
          usually columns
      * - MetricsControl: Dropdown to select metrics, triggering a modal
          to define Metric details
      * - AdhocFilterControl: Control to choose filters
      * - CheckboxControl: A checkbox for choosing true/false values
      * - SliderControl: A slider with min/max values
      * - TextControl: Control for text data
      *
      * For more control input types, check out the `incubator-superset` repo
      * and open this file: superset-frontend/src/explore/components/controls/index.js
      *
      * To ensure all controls have been filled out correctly, the following
      * validators are provided
      * by the `@superset-ui/core/lib/validator`:
      * - validateNonEmpty: must have at least one value
      * - validateInteger: must be an integer value
      * - validateNumber: must be an intger or decimal value
      */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'groupby',
            config: {
              ...sharedControls.columns,
              label: t('Wilayah'),
              description: t('Wilayah'),
              validators: [validateNonEmpty],
            },
          },
        ],
        [
          {
            name: 'level1Map',
            config: {
              type: 'TextControl',
              label: t('Peta level 1'),
              description: t('Geojson peta level 1'),
              validators: [validateNonEmpty],
            },
          },
        ],
        [
          {
            name: 'level1Key',
            config: {
              type: 'TextControl',
              label: t('ID Wilayah Peta Level 1'),
              description: t('Property key pada poligon wilayah'),
              default: t('idprov'),
            },
          },
        ],
        [
          {
            name: 'level2Map',
            config: {
              type: 'TextControl',
              label: t('Peta level 2'),
              description: t('Geojson peta level 2'),
            },
          },
        ],
        [
          {
            name: 'level2Key',
            config: {
              type: 'TextControl',
              label: t('ID Wilayah Peta Level 2'),
              description: t('Property key pada poligon wilayah'),
              default: t('idkab'),
            },
          },
        ],
        [
          {
            name: 'level3Map',
            config: {
              type: 'TextControl',
              label: t('Peta level 3'),
              description: t('Geojson peta level 3'),
            },
          },
        ],
        [
          {
            name: 'level3Key',
            config: {
              type: 'TextControl',
              label: t('ID Wilayah Peta Level 3'),
              description: t('Property key pada poligon wilayah'),
              default: t('idkec'),
            },
          },
        ],
        [
          {
            name: 'level4Map',
            config: {
              type: 'TextControl',
              label: t('Peta level 4'),
              description: t('Geojson peta level 4'),
            },
          },
        ],
        [
          {
            name: 'level4Key',
            config: {
              type: 'TextControl',
              label: t('ID Wilayah Peta Level 4'),
              description: t('Property key pada poligon wilayah'),
              default: t('iddesa'),
            },
          },
        ],
        [
          {
            name: 'level5Map',
            config: {
              type: 'TextControl',
              label: t('Peta level 5'),
              description: t('Geojson peta level 5'),
            },
          },
        ],
        [
          {
            name: 'level5Key',
            config: {
              type: 'TextControl',
              label: t('ID Wilayah Peta Level 5'),
              description: t('Property key pada poligon wilayah'),
              default: t('idsls'),
            },
          },
        ],
        [
          {
            name: 'legendPostion',
            config: {
              type: 'SelectControl',
              label: t('Posisi legenda'),
              default: 'Bottom Right',
              choices: formatSelectOptions([
                'Top Left',
                'Top Right',
                'Bottom Left',
                'Bottom Right',
              ]),
              description: t('Which country to plot the map for?'),
            },
          },
        ],
        ['adhoc_filters'],
        emitFilterControl,
        ['metrics'],
        [
          {
            name: 'long',
            config: {
              ...sharedControls.columns,
              label: t('Longitude'),
              description: t('Longitude'),
            },
          },
          {
            name: 'lat',
            config: {
              ...sharedControls.columns,
              label: t('Latitude'),
              description: t('Latitude'),
            },
          },
          {
            name: 'idv',
            config: {
              ...sharedControls.columns,
              label: t('ID individu'),
              description: t('Idintifier untuk individu'),
            },
          },
          {
            name: 'symbol',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Symbol'),
              default: 'pin',
              description: t('Bentuk marker'),
              choices: formatSelectOptions([
                'circle',
                'rect',
                'roundRect',
                'triangle',
                'diamond',
                'pin',
                'arrow',
                'none',
              ]),
            },
          },
          {
            name: 'symbolSize',
            config: {
              type: 'TextControl',
              label: t('Ukuran marker'),
              description: t('Ukuran marker'),
              default: 5,
            },
          },
          {
            name: 'symbolColor',
            config: {
              ...sharedControls.color_picker,
              renderTrigger: false,
              label: t('Warna marker'),
              description: t('Warna marker'),
              validators: [validateNonEmpty],
            },
          },
        ],
      ],
    },
    {
      label: t('Hello Controls!'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'minColor',
            config: {
              ...sharedControls.color_picker,
              renderTrigger: false,
              label: t('Warna minimal'),
              description: t('Warna minimal'),
              validators: [validateNonEmpty],
            },
          },
          {
            name: 'midColor',
            config: {
              ...sharedControls.color_picker,
              renderTrigger: false,
              label: t('Warna tengah'),
              description: t('Warna tengah'),
              validators: [validateNonEmpty],
            },
          },
          {
            name: 'maxColor',
            config: {
              ...sharedControls.color_picker,
              renderTrigger: false,
              label: t('Warna maksimal'),
              description: t('Warna minimal'),
              validators: [validateNonEmpty],
            },
          },
        ],
        [
          {
            name: 'minValue',
            config: {
              type: 'TextControl',
              renderTrigger: false,
              label: t('Nilai minimal'),
              description: t('Nilai minimal'),
              validators: [validateNonEmpty],
            },
          },
          {
            name: 'maxValue',
            config: {
              type: 'TextControl',
              renderTrigger: false,
              label: t('Nilai maksimal'),
              description: t('Nilai minimal'),
              validators: [validateNonEmpty],
            },
          },
        ],
      ],
    },
  ],
};

export default config;
