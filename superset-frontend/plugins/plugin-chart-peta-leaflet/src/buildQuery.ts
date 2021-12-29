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
  buildQueryContext,
  ensureIsArray,
  getMetricLabel,
  normalizeOrderBy,
  QueryFormData,
} from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {
  const {
    level_1 = [],
    level_2 = [],
    level_3 = [],
    level_4 = [],
    level_5 = [],
    level_6 = [],
    order_desc = true,
    val_batang,
    timeseries_limit_metric,
  } = formData;
  const group_1 = new Set([...ensureIsArray(level_1)]);
  const group_2 = new Set([...ensureIsArray(level_2)]);
  const group_3 = new Set([...ensureIsArray(level_3)]);
  const group_4 = new Set([...ensureIsArray(level_4)]);
  const group_5 = new Set([...ensureIsArray(level_5)]);
  const group_6 = new Set([...ensureIsArray(level_6)]);
  return buildQueryContext(formData, baseQueryObject => {
    const queryObject = normalizeOrderBy({ ...baseQueryObject, order_desc });
    const { metrics } = queryObject;
    const orderBy = ensureIsArray(timeseries_limit_metric);

    if (
      orderBy.length &&
      !(
        metrics != null &&
        metrics.find(metric => getMetricLabel(metric) === getMetricLabel(orderBy[0]))
      )
    ) {
      // eslint-disable-next-line no-unused-expressions
      metrics == null ? undefined : metrics.push(orderBy[0]);
    }

    if (val_batang !== undefined && metrics !== undefined) {
      metrics.push(val_batang);
    }

    return [
      { ...queryObject, columns: [...group_1], metrics },
      { ...queryObject, columns: [...group_2], metrics },
      { ...queryObject, columns: [...group_3], metrics },
      { ...queryObject, columns: [...group_4], metrics },
      { ...queryObject, columns: [...group_5], metrics },
      { ...queryObject, columns: [...group_6], metrics },
    ];
  });
}
