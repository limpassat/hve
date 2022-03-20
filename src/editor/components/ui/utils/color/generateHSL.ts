

export type HSLDiapason = {
  hue: [number, number];
  saturation: [number, number];
  lightness: [number, number];
};

const {round, random} = Math;

export const generateHSLInDiapason = (diapason: HSLDiapason): string => {
  const {hue, saturation, lightness} = diapason;
  const randHue = hue[0] + round(random() * (hue[1] - hue[0]));
  const randSaturation = saturation[0] + round(random() * (saturation[1] - saturation[0]));
  const randLightness = lightness[0] + round(random() * (lightness[1] - lightness[0]));

  return `${randHue}deg, ${randSaturation}%, ${randLightness}%`;
};