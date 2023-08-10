import React, { FC } from 'react';
import { ColorCollection } from '../hooks/useTreeColors';

const white = '#fff';

export const Legend: FC = () => (
  <>
    <div
      style={{
        padding: '10px',
        position: 'absolute',
        bottom: 5,
        left: 5,
        backgroundColor: white,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Wasserversorgung
      </div>
      {Object.keys(ColorCollection).map(key => {
        const c = ColorCollection[key as keyof typeof ColorCollection];
        return (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '3px',
            }}
          >
            <div
              style={{
                width: '15px',
                height: '15px',
                marginRight: '10px',
                borderRadius: '50%',
                backgroundColor: `rgba(${c.color.toString()})`,
                border: key === 'sensor' ? '2px solid' : '',
                borderColor:
                  key === 'sensor'
                    ? `rgba(${c.darkColor.toString()})`
                    : '#ffffffff',
              }}
            />
            <div>{c.description}</div>
          </div>
        );
      })}
    </div>
  </>
);
