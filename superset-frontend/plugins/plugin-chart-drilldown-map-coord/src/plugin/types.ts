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
import {
  ChartDataResponseResult,
  ChartProps,
  QueryFormData,
  SetDataMaskHook,
} from '@superset-ui/core';

export type DrilldownMapCoordFormData = QueryFormData & {
  legendPostion: string;
  groupby: string[];
  emitFilter: boolean;
  symbolSize: number;
  symbolColor: any;
  symbol: string;
};

export enum DrilldownMapCoordLabelType {
  Key = 'key',
  Value = 'value',
  Percent = 'percent',
  KeyValue = 'key_value',
  KeyPercent = 'key_percent',
  KeyValuePercent = 'key_value_percent',
}

export interface DrilldownMapCoordChartProps extends ChartProps {
  formData: DrilldownMapCoordFormData;
  queriesData: ChartDataResponseResult[];
}

export interface DrilldownMapCoordTransformedProps {
  formData: DrilldownMapCoordFormData;
  height: number;
  width: number;
  setDataMask: SetDataMaskHook;
  groupby: string[];
  selectedValues: Record<number, string>;
  map_url: string[];
  koy: string[];
  color_range: string[];
  minValue: number;
  maxValue: number;
  data: any[];
  cord_data: any[];
}
