import { SwitchVariant } from "../Controls/controls/base/SwitchButton";
import { WidthUnit, widthUnits } from "./parseWidthUnit";


export const getPaddingSwitchValue = (val: string): SwitchVariant["id"] => {

  const splitted = val
  .split(/\s+/g)
  .slice(0, 4)
  .filter(p => !widthUnits.includes(p as WidthUnit));

  switch (splitted.length) {
    case 1: {
      return "full";
    }
    case 2: {
      return "hand";
    }
    case 3:
    case 4: {
      return "quarter";
    }
    default: {
      return "full";
    }
  }
};