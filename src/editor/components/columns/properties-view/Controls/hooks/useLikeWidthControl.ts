import React, { useCallback, useContext } from "react";
import { EditorContext } from "../../../../../EditorContext/EditorContext";
import { parseWidthUnit } from "../../utils/parseWidthUnit";
import { Option } from "../controls/base/Select";
import { withoutWidthUnit } from "../../utils/withoutWidthUnit";


export const useLikeWidthControl = (cssProp) => {

  const {editorStore: {propertiesStore}} = useContext(EditorContext);

  const getCSSValue = () => propertiesStore.getPropertyValue(cssProp) || "";

  const getUnit = parseWidthUnit;

  const cssValue = getCSSValue();

  const unit = getUnit(cssValue);

  const value = withoutWidthUnit(cssValue);

  const onChangeUnit = useCallback((opt: Option) => {
    const value = withoutWidthUnit(getCSSValue());
    propertiesStore.setPropertyValue(cssProp, `${value}${opt}`);
  }, []);

  const onChangeInput = (val: string) => {
    const newUnit = getUnit(val) || getUnit(getCSSValue());
    val = withoutWidthUnit(val);
    propertiesStore.setPropertyValue(cssProp, val ? val + newUnit : "");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      let value = Number(withoutWidthUnit(getCSSValue()).trim());
      const unit = getUnit(getCSSValue());
      if (!isNaN(value)) {
        value = value + (e.key === "ArrowUp" ? 1 : -1);
        e.preventDefault();
        propertiesStore.setPropertyValue(cssProp, value + unit)
      }
    }
  };

  return {
    unit,
    value,
    onChangeInput,
    onChangeUnit,
    onKeyDown
  };
};