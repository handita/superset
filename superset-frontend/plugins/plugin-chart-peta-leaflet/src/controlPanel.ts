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
import { ControlPanelConfig, sections, sharedControls } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'level_1',
            config: {
              ...sharedControls.groupby,
              label: t('ID Level 1'),
              description: t('ID Level 1'),
              // validators: [validateNonEmpty],
            },
          },
        ],
        ['metric'],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Warna peta'),
      expanded: false,
      tabOverride: 'customize',
      controlSetRows: [
        [
          {
            name: 'warna_min',
            config: {
              ...sharedControls.color_picker,
              label: t('Warna minimal'),
              description: t('Warna untuk nilai minimal'),
            },
          },
        ],
        [
          {
            name: 'warna_tengah',
            config: {
              ...sharedControls.color_picker,
              label: t('Warna pertengahan'),
              description: t('Warna untuk nilai pertengahan'),
            },
          },
        ],
        [
          {
            name: 'warna_maks',
            config: {
              ...sharedControls.color_picker,
              label: t('Warna Maksimal'),
              description: t('Warna untuk nilai maksimal'),
            },
          },
        ],
      ],
    },
  ],
  controlOverrides: {
    metrics: {
      label: t('Nilai untuk peta'),
      description: t('Nilai yang digunakan untuk menghitung warna'),
    },
    linear_color_scheme: {
      renderTrigger: false,
    },
  },
};

export default config;
