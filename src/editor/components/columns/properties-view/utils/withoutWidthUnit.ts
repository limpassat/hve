import { parseWidthUnit, WidthUnit } from "./parseWidthUnit";


export const withoutWidthUnit = (val: string, unit?: WidthUnit): string => {
  const u = unit || parseWidthUnit(val);
  return u ? val.replaceAll(u, "") : val;
};