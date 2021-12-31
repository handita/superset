/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
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
// @ts-ignore
// @ts-nocheck
import React, { useEffect, createRef, useState, useRef, useMemo, useCallback } from 'react';
import { styled, DataMask, ApiV1, DatasourceType } from '@superset-ui/core';
import L from 'leaflet';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import { PetaLeafletStylesProps } from './types';

import 'leaflet/dist/leaflet.css';



//const Container = styled.div<PetaLeafletStylesProps>`
//`;
const Container = styled.div<PetaLeafletStylesProps>`
 position: relative;    

 & > * {
     position: relative;
     top: 0;
     left: 0;
     height: ${({ height }) => height};
     width: ${({ width }) => width};
 }


 .leaflet-control-zoom > .leaflet-bar > .leaflet-control{
     z-index: 10000
 }

 .leaflet-control-layers-list{ 
     width:auto;
     background-position:3px 50% ;
     padding:3px;
     text-decoration:none;
     line-height:36px;
     text-align: left;
     text-transform: uppercase;
   }

`

export default function MapLeaflet(props) {

  const [currentMap, setCurrentMap] = useState(null);;
  const [isReady, setIsReady] = useState(false);
  const { data, height, width, formData, setDataMask, groupBy, selectedValues, mapsUrl, keys, colorRange, minValue, maxValue, coordData } = props;
  const rootElem = createRef<HTMLDivElement>();
  // const [key, setKey] = useState(null);

  const tile = useMemo(() => {
    return L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapLeaflet',
      tileSize: 512,
      zoomOffset: -1
    });
    // return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // })
  }, []);

  const whenClicked = function (e, feature) {
    console.log(feature);
  }

  function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.density)
    };
  }
  function getColor(d) {
    return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
          d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' : '#FFEDA0';
  }

  const onEachFeature = function (feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name);
      layer.on({
        click: (e) => whenClicked(e, feature)
      });
    }
  }

  // const handleChange = useCallback(
  //   (values: string[]) => {
  //     if (!formData.emitFilter) {
  //       return;
  //     }

  //     const groupbyValues = values;

  //     const dataMask: DataMask = {
  //       extraFormData: {
  //         filters:
  //           values.length === 0
  //             ? []
  //             : [
  //               {
  //                 col: groupBy[level.current],
  //                 op: 'IN',
  //                 val: values,
  //               },
  //             ],
  //       },
  //       filterState: {
  //         value: groupbyValues.length ? groupbyValues : null,
  //         selectedValues: values.length ? values : null,
  //       },
  //     };

  //     if (JSON.stringify(values) === JSON.stringify(['Back'])) {
  //       if (level.current > 0) {
  //         level.current -= 1;
  //         crossf.current.pop();
  //         setDataMask(crossf.current[crossf.current.length - 1]);
  //       }
  //     } else {
  //       if (level.current < groupby.length - 1) {
  //         crossf.current.push(dataMask);
  //       }
  //       setDataMask(dataMask);
  //     }
  //   },
  //   [groupBy, setDataMask, selectedValues],
  // );

  // const eventHandlers: EventHandlers = {
  //   click: props => {
  //     const { name } = props;
  //     const values = Object.values(selectedValues);
  //     if (props.event.target.style.text === 'Back') {
  //       handleChange(['Back']);
  //     } else if (values.includes(name)) {
  //       handleChange(values.filter(v => v !== name));
  //     } else {
  //       handleChange([name]);
  //     }
  //   },
  // };

  // const position = [51.505, -0.09]
  const position = [-2.2753379, 119.4176271];

  return (
    <Container
      ref={rootElem}
      height={height}
      width={width}
    >
      <MapContainer
        style={{ width, height }}
        center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />

        <GeoJSON attribution="&copy; credits BPS RI" data={currentMap}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </Container>
  );
}

