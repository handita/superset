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
import { ControlPanelConfig, sections, sharedControls, formatSelectOptions } from '@superset-ui/chart-controls';
import { emitFilterControl } from '@superset-ui/chart-controls/src/shared-controls/emitFilterControl';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'groupBy',
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
              default: t('map_provinsi')
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
              default: t('map_kabupaten'),
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
        ]
      ],
    },
    {
      label: t('Color Grade'),
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
