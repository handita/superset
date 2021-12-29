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
import React, { useRef, useEffect, useCallback } from 'react';
import { DataMask, styled } from '@superset-ui/core';
import { ECharts, init, registerMap } from 'echarts';
import { get } from 'jquery';
import { DrilldownMapCoordTransformedProps } from './plugin/types';
import { EchartsStylesProps, EventHandlers } from './types';

const Styles = styled.div<EchartsStylesProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

export default function Echart({
  formData,
  height,
  width,
  setDataMask,
  groupby,
  selectedValues,
  map_url,
  koy,
  color_range,
  minValue,
  maxValue,
  data,
  cord_data,
}: DrilldownMapCoordTransformedProps) {
  const key = koy;
  const level = useRef(0);
  const filter = useRef<string[]>(['']);
  // const indikator = useRef<string>('count');
  const crossf = useRef<DataMask[]>([
    {
      extraFormData: {
        filters: [
          {
            col: groupby[0],
            op: 'IS NOT NULL',
          },
        ],
      },
      filterState: {
        value: null,
        selectedValues: null,
      },
    },
  ]);
  function getData() {
    const l = level.current;
    const col = groupby[l];
    // const ind = indikator;
    let res: any;
    if (level.current === 0) {
      res = data[l].map((d: { [x: string]: any; count: any }) => ({
        name: d[col],
        value: d.count,
        groupId: d[col],
      }));
    } else {
      const len = filter.current[l - 1].length;
      res = data[l]
        .filter((d: { [x: string]: string }) => d[col].slice(0, len) === filter.current[l - 1])
        .map((d: { [x: string]: any; count: any }) => ({
          name: d[col],
          value: d.count,
          groupId: d[col],
        }));
    }
    return res;
  }
  function getCorData() {
    return cord_data.map(d => ({
      name: d.idv,
      value: [d.long, d.lat],
    }));
  }
  const handleChange = useCallback(
    (values: string[]) => {
      if (!formData.emitFilter) {
        return;
      }

      const groupbyValues = values;

      const dataMask: DataMask = {
        extraFormData: {
          filters:
            values.length === 0
              ? []
              : [
                  {
                    col: groupby[level.current],
                    op: 'IN',
                    val: values,
                  },
                ],
        },
        filterState: {
          value: groupbyValues.length ? groupbyValues : null,
          selectedValues: values.length ? values : null,
        },
      };

      if (JSON.stringify(values) === JSON.stringify(['Back'])) {
        if (level.current > 0) {
          level.current -= 1;
          crossf.current.pop();
          setDataMask(crossf.current[crossf.current.length - 1]);
        }
      } else {
        if (level.current < groupby.length - 1) {
          crossf.current.push(dataMask);
        }
        setDataMask(dataMask);
      }
    },
    [groupby, setDataMask, selectedValues],
  );

  const eventHandlers: EventHandlers = {
    click: props => {
      const { name } = props;
      const values = Object.values(selectedValues);
      if (props.event.target.style.text === 'Back') {
        handleChange(['Back']);
      } else if (values.includes(name)) {
        handleChange(values.filter(v => v !== name));
      } else {
        handleChange([name]);
      }
    },
  };

  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts>();

  //

  let legend_position_data;
  legend_position_data = {
    'Top Left': { left: 'left', top: 'top' },
    'Top Right': { left: 'right', top: 'top' },
    'Bottom Left': { left: 'left', top: 'bottom' },
    'Bottom Right': { left: 'right', top: 'bottom' },
  };
  legend_position_data = {
    'Top Left': { left: 'left', top: 'top' },
    'Top Right': { left: 'right', top: 'top' },
    'Bottom Left': { left: 'left', top: 'bottom' },
    'Bottom Right': { left: 'right', top: 'bottom' },
  };
  const legend = legend_position_data[formData.legendPostion];
  const maps = useRef<any[]>([]);
  const map_stack = useRef<any[]>([]);
  const option_stack = useRef<{ map: any[] }>({ map: [] });

  function drawmap(map: any, group = '') {
    if (level.current === 0) {
      map_stack.current.push(map);
    }
    registerMap(`map${level.current}`, map);

    const opt = {
      visualMap: {
        left: legend?.left,
        top: legend?.top,
        min: minValue,
        max: maxValue,
        inRange: {
          // prettier-ignore
          color: color_range,
        },
        text: ['High', 'Low'],
        calculable: true,
      },
      geo: {
        map: `map${level.current}`,
        scaleLimit: {
          min: 0.1,
          max: 100,
        },
        roam: true,
      },
      series: [
        {
          id: 'population',
          type: 'map',
          roam: true,
          geoIndex: 0,
          dataGroupId: group,
          map: `map${level.current}`,
          animation: true,
          animationDurationUpdate: 1000,
          universalTransition: true,
          data: getData(),
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          symbol: formData.symbol,
          symbolSize: formData.symbolSize,
          itemStyle: {
            color: `rgba(${formData.symbolColor.r},${formData.symbolColor.g},${formData.symbolColor.b},${formData.symbolColor.a})`,
          },
          encode: {
            tooltip: 2,
          },
          data: getCorData(),
        },
      ],
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: true },
          saveAsImage: {},
        },
      },
      graphic: [
        {
          type: 'text',
          left: 50,
          top: 20,
          style: {
            text: 'Back',
            fontSize: 18,
          },
          onclick() {
            if (level.current > 0) {
              map_stack.current.pop();
              option_stack.current.map.pop();
              chartRef.current?.setOption(option_stack.current.map[level.current - 1], true);
              filter.current.pop();
            }
          },
        },
      ],
    };
    option_stack.current.map.push(opt);
  }

  useEffect(() => {
    if (!divRef.current) return;
    if (!chartRef.current) {
      chartRef.current = init(divRef.current);
    }

    Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
      chartRef.current?.off(name);
      chartRef.current?.on(name, handler);
    });

    chartRef.current?.on('click', event => {
      if (event.data !== undefined && level.current < groupby.length - 1) {
        level.current += 1;
        getData();
        if (maps.current[level.current]) {
          const filtered_map = {
            type: 'FeatureCollection',
            features: maps.current[level.current].features.filter(
              (d: any) => d.properties[key[level.current - 1]] === event.name,
            ),
          };
          map_stack.current.push(filtered_map);
          drawmap(filtered_map, event.name);
          chartRef.current?.setOption(option_stack.current.map[level.current], true);
        } else {
          get(map_url[level.current], function (map: any) {
            maps.current[level.current] = map;
            const filtered_map = {
              type: 'FeatureCollection',
              features: maps.current[level.current].features.filter(
                (d: any) => d.properties[key[level.current - 1]] === event.name,
              ),
            };
            map_stack.current.push(filtered_map);
            drawmap(filtered_map, event.name);
            chartRef.current?.setOption(option_stack.current.map[level.current], true);
          });
        }
        filter.current?.push(event.name);
      }
    });

    if (option_stack.current.map.length === 0) {
      const map = maps.current[level.current];
      if (map) {
        drawmap(map);
        chartRef.current.setOption(option_stack.current.map[level.current], true);
      } else {
        get(map_url[level.current], function (map) {
          maps.current[level.current] = map;
          drawmap(map);
          chartRef.current?.setOption(option_stack.current.map[level.current], true);
        });
      }
    }
  }, [eventHandlers, selectedValues]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.resize({ width, height });
    }
  }, [width, height]);

  return <Styles ref={divRef} height={height} width={width} />;
}
