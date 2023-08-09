import { WebMercatorViewport } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import React, { useEffect, useState } from 'react';
import StaticMap from 'react-map-gl';
import { Legend } from './components/Legend';
import { TreeToltip } from './components/TreeTooltip';
import { SupersetPluginTreesMapProps } from './types';
import useTreeColors, { SensorColorCollection } from './hooks/useTreeColors';

export default function SupersetPluginTreesMap(
  props: SupersetPluginTreesMapProps,
) {
  const { mapboxApiAccessKey, data, height, width } = props;

  const INITIAL_VIEW_STATE = {
    longitude: 13.39883104394256,
    latitude: 52.498574638202776,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const [viewState, setViewState] = useState<any>(INITIAL_VIEW_STATE);
  const [selectedObject, setSelectedObject] = useState<any>();
  const [hoveredObject, setHoveredObject] = useState<any>();

  const { colorForNowcastValue, darkColorForNowcastValue } = useTreeColors();

  useEffect(() => {
    setSelectedObject(undefined);
  }, [viewState]);

  useEffect(() => {
    const lats = data.map(xs => xs.lat as number);
    const lons = data.map(xs => xs.lng as number);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewState,
    ).fitBounds(
      [
        [minLon, minLat],
        [maxLon, maxLat],
      ],
      { minExtent: 0.05 },
    );

    setViewState({
      ...viewState,
      longitude,
      latitude,
      zoom,
    });
  }, [data]);

  const layers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 1,
      stroked: true,
      filled: true,
      radiusMinPixels: 4,
      radiusMaxPixels: 30,
      lineWidthMinPixels: 0,
      lineWidthMaxPixels: 10,
      getPosition: (d: any) => [d.lng, d.lat],
      getRadius: (d: any) => 6,
      getFillColor: (data: any) => {
        const nowcast = parseInt(data.nowcast_value, 10);
        return colorForNowcastValue(nowcast);
      },
      getLineColor: (d: any) => {
        const isHovered = hoveredObject === d.id;
        const hasActualSensor = d.has_actual_sensor;
        if (hasActualSensor) {
          return isHovered
            ? SensorColorCollection.darkColor
            : SensorColorCollection.color;
        }
        const nowcast = d.nowcast_value;
        return isHovered
          ? darkColorForNowcastValue(nowcast)
          : [255, 255, 255, 255];
      },
      getLineWidth: (d: any) => {
        const width = d.has_actual_sensor ? 2 : 0;
        const highlightedWidth = hoveredObject === d.id ? width + 5 : width;
        return highlightedWidth;
      },
      onClick: (info: any) => {
        setSelectedObject(info);
      },
      updateTriggers: {
        getLineColor: [hoveredObject],
        getLineWidth: [hoveredObject],
      },
    }),
  ];

  const getTooltip = ({ object }: any) => {
    if (object?.id) {
      setHoveredObject(object.id);
    } else {
      setHoveredObject(undefined);
    }
    return null;
  };

  return (
    <>
      <div style={{ position: 'relative', width, height }}>
        <DeckGL
          initWebGLParameters
          controller
          width={width}
          height={height}
          layers={layers}
          viewState={viewState}
          glOptions={{ preserveDrawingBuffer: true }}
          onViewStateChange={({ viewState }: any) => {
            setViewState(viewState);
          }}
          getTooltip={getTooltip}
        >
          <StaticMap
            preserveDrawingBuffer
            mapboxApiAccessToken={mapboxApiAccessKey}
          />
        </DeckGL>
        <Legend />
        {selectedObject && (
          <TreeToltip
            selectedObject={selectedObject}
            setSelectedObject={setSelectedObject}
          />
        )}
      </div>
    </>
  );
}
