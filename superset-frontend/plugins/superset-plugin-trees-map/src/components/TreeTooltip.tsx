import React, { FC, useState } from 'react';
import { FiClipboard } from 'react-icons/fi';

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
}) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x + 1,
          top: y + 1,
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
            <p
              style={{
                marginBottom: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>ID: {selectedObject.id}</span>
              <FiClipboard
                role="button"
                style={{
                  cursor: 'pointer',
                  marginLeft: '3px',
                  color: copiedToClipboard ? 'green' : 'black',
                }}
                onClick={() => {
                  navigator.clipboard.writeText(selectedObject.id);
                  setCopiedToClipboard(true);
                  setTimeout(() => {
                    setCopiedToClipboard(false);
                  }, 2000);
                }}
              />
            </p>
            {selectedObject.has_actual_sensor && (
              <p
                style={{
                  marginTop: '4px',
                  marginBottom: 0,
                  fontWeight: 'bold',
                }}
              >
                Sensor verbaut
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
