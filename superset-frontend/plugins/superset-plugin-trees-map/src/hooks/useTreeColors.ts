import { useCallback } from 'react';

export const ColorCollection = {
  good: {
    description: 'Gut',
    color: [112, 187, 137],
    darkColor: [82, 171, 111],
  },
  average: {
    description: 'Mäßig',
    color: [251, 245, 192],
    darkColor: [224, 215, 126],
  },
  critical: {
    description: 'Kritisch',
    color: [254, 172, 118],
    darkColor: [235, 138, 74],
  },
  unknown: {
    description: 'Unbekannt',
    color: [229, 231, 235],
    darkColor: [17, 24, 39],
  },
};

export const SensorColorCollection = {
  color: [255, 0, 0],
  darkColor: [179, 9, 0],
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

  const darkColorForNowcastValue = useCallback((nowcast: number) => {
    let returnColor = ColorCollection.unknown.darkColor;
    if (nowcast && nowcast < 33) {
      const {
        good: { darkColor },
      } = ColorCollection;
      returnColor = darkColor;
    } else if (nowcast && nowcast < 81) {
      const {
        average: { darkColor },
      } = ColorCollection;
      returnColor = darkColor;
    } else {
      const {
        critical: { darkColor },
      } = ColorCollection;
      returnColor = darkColor;
    }
    return returnColor;
  }, []);

  return { colorForNowcastValue, darkColorForNowcastValue };
};

export default useTreeColors;
