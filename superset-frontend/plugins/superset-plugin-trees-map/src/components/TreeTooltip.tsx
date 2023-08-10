import React, { FC } from 'react';

interface TreeToltipProps {
  selectedObject: any;
  setSelectedObject: (obj: any) => void;
  setHoveredObject: (obj: any) => void;
  x: number;
  y: number;
}

const white = '#fff';

export const TreeToltip: FC<TreeToltipProps> = ({
  selectedObject,
  setSelectedObject,
  setHoveredObject,
  x,
  y,
}) => (
  <>
    <div
      style={{
        backgroundColor: white,
        padding: '5px',
        width: 'auto',
        height: 'auto',
        borderRadius: '5px',
      }}
    >
      <div style={{ position: 'relative' }}>
        <div
          role="button"
          tabIndex={0}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => {
            setHoveredObject(undefined);
            setSelectedObject(undefined);
          }}
        >
          ✕
        </div>
        <div style={{ padding: '5px 20px 5px 5px' }}>
          <p style={{ marginBottom: '4px' }}>
            {selectedObject.art_dtsch}, {selectedObject.standalter} Jahre
          </p>
          <p style={{ marginBottom: '4px' }}>
            Saugspannung (heute): {selectedObject.nowcast_value} kPa
          </p>
          <p style={{ marginBottom: '4px' }}>
            {selectedObject.strname} {selectedObject.hausnr},{' '}
            {selectedObject.standortnr}
          </p>
          <p style={{ marginBottom: 0 }}>ID: {selectedObject.id}</p>
          {selectedObject.has_actual_sensor && (
            <p style={{ marginTop: '4px', fontWeight: 'bold' }}>
              Sensor verbaut
            </p>
          )}
        </div>
      </div>
    </div>
  </>
);
