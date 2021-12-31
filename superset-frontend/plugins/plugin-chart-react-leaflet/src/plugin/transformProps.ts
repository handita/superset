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
import { ChartProps } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your PetaRutePenerbangan.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
  const { width, height, formData, queriesData, hooks, filterState } = chartProps;
  const {
    groupBy = [],
    level1Map,
    level2Map,
    level1Key,
    level2Key,
    minValue,
    maxValue,
    minColor,
    midColor,
    maxColor,
  } = formData;
  const maps = [level1Map, level2Map];
  const keys = [level1Key, level2Key];
  const datah: any[] = [];
  let coordData: any[] = [];
  let i: number;
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < groupBy.length; i++) {
    datah[i] = queriesData[i].data;
  }
  if (queriesData.length > groupBy.length) {
    coordData = queriesData[i].data;
  }

  const { setDataMask = () => { } } = hooks;

  const selectedValues = (filterState.selectedValues || []).reduce(
    (acc: Record<string, number>, selectedValue: string) => {
      const index = 0;
      return {
        ...acc,
        [index]: selectedValue,
      };
    },
    {},
  );
  const mapsUrl: string[] = [];
  const key: string[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < groupBy.length; i++) {
    mapsUrl[i] = maps[i];
    key[i] = keys[i];
  }

  return {
    height,
    width,
    setDataMask,
    groupBy,
    selectedValues,
    formData,
    mapsUrl,
    keys: key,
    color_range: [
      `rgba(${minColor.r},${minColor.g},${minColor.b},${minColor.a})`,
      `rgba(${midColor.r},${midColor.g},${midColor.b},${midColor.a})`,
      `rgba(${maxColor.r},${maxColor.g},${maxColor.b},${maxColor.a})`,
    ],
    minValue,
    maxValue,
    data: datah,
    coordData,
  };
}

