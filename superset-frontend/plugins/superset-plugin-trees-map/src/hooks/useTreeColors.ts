import { useCallback } from 'react';

export const ColorCollection = {
  good: {
    description: 'Gut',
    color: [112, 187, 137],
  },
  average: {
    description: 'Mäßig',
    color: [251, 245, 192],
  },
  critical: {
    description: 'Kritisch',
    color: [254, 172, 118],
  },
  unknown: {
    description: 'Unbekannt',
    color: [229, 231, 235],
  },
};

const useTreeColors = () => {
  const colorForNowcastValue = useCallback((nowcast: number) => {
    let returnColor = ColorCollection.unknown.color;
    if (nowcast && nowcast < 33) {
      const {
        good: { color },
      } = ColorCollection;
      returnColor = color;
    } else if (nowcast && nowcast < 81) {
      const {
        average: { color },
      } = ColorCollection;
      returnColor = color;
    } else {
      const {
        critical: { color },
      } = ColorCollection;
      returnColor = color;
    }
    return returnColor;
  }, []);

  return { colorForNowcastValue };
};

export default useTreeColors;
