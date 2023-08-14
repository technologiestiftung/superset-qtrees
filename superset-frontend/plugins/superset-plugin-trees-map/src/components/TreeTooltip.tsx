import React, { FC, useRef, useState } from 'react';
import { FiClipboard } from 'react-icons/fi';

interface TreeToltipProps {
  selectedObject: any;
  setSelectedObject: (obj: any) => void;
  setHoveredObject: (obj: any) => void;
  x: number;
  y: number;
  width: number;
  height: number;
}

const white = '#fff';

export const TreeToltip: FC<TreeToltipProps> = ({
  selectedObject,
  setSelectedObject,
  setHoveredObject,
  x,
  y,
  width,
  height,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const anchor = function () {
    if (!ref?.current) return [x + 1, y + 1];
    const realWidth = ref.current.offsetWidth;
    const realHeight = ref.current.offsetHeight;
    if (x + realWidth > width) {
      if (y + realHeight > height) {
        return [x - realWidth - 1, y - realHeight - 1];
      }
      return [x - realWidth - 1, y + 1];
    }
    if (y + realHeight > height) {
      return [x + 1, y - realHeight - 1];
    }
    return [x + 1, y + 1];
  };

  const tooltip = function (ref: React.RefObject<HTMLDivElement> | undefined) {
    return (
      <div
        ref={ref}
        style={{
          zIndex: ref ? -1 : 1,
          position: 'absolute',
          left: ref ? 1 : anchor()[0],
          top: ref ? 1 : anchor()[1],
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
    );
  };

  return (
    <>
      {/* Render behind the map, invisible -> Used for getting actual width of height of div */}
      {tooltip(ref)}
      {/* Actual tooltip rendered at correct position */}
      {ref?.current && tooltip(undefined)}
    </>
  );
};
