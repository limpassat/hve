import { generateHSLInDiapason, HSLDiapason } from "./generateHSL";


export class NodeNameRandomColor {

  static colorDiapason: HSLDiapason = {
    hue: [0, 100],
    saturation: [75, 85],
    lightness: [75, 85]
  };

  static get(nodeName: string): string {
    return localStorage.getItem(`rand-color-${nodeName}`) || NodeNameRandomColor.set(nodeName);
  }

  private static set(nodeName: string): string {
    const generated = generateHSLInDiapason(NodeNameRandomColor.colorDiapason);
    localStorage.setItem(`rand-color-${nodeName}`, generated);
    return generated;
  }

}