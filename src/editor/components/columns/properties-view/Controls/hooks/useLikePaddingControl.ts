import React, { useCallback, useContext, useState } from "react";
import { EditorContext } from "../../../../../EditorContext/EditorContext";
import { SwitchVariant } from "../controls/base/SwitchButton";
import { getPaddingSwitchValue } from "../../utils/getPaddingSwitchValue";
import { parsePaddingValue } from "../../utils/parsePaddingValue";
import { joinPaddingValue } from "../../utils/joinPaddingValue";
import { withoutWidthUnit } from "../../utils/withoutWidthUnit";
import { parseWidthUnit } from "../../utils/parseWidthUnit";


export const useLikePaddingControl = (cssProp) => {

  const {editorStore: {propertiesStore}} = useContext(EditorContext);

  const getCSSValue = () => propertiesStore.getPropertyValue(cssProp) || "";

  const value = getCSSValue();

  const [switchValue, setSwitchValue] = useState<SwitchVariant["id"]>(getPaddingSwitchValue(value));

  const getHandValue = ident => {
    const parsed = parsePaddingValue(value);
    return ident === "vertical" ? parsed.top : parsed.right;
  };
  const getQuarterValue = ident => {
    const parsed = parsePaddingValue(value);
    return parsed[ident] || "0px";
  };

  const changeMainValue = useCallback((val) => {
    propertiesStore.setPropertyValue(cssProp, val);
  }, []);

  const changeHandValue = (ident, val) => {
    const parsed = parsePaddingValue(propertiesStore.getPropertyValue(cssProp));
    if (ident === "vertical") {
      parsed.top = val || 0;
      parsed.bottom = val || 0;
    } else {
      parsed.left = val || 0;
      parsed.right = val || 0;
    }
    propertiesStore.setPropertyValue(cssProp, joinPaddingValue(parsed));
  };

  const changeQuarterValue = (ident, val) => {
    const parsed = parsePaddingValue(propertiesStore.getPropertyValue(cssProp));
    parsed[ident] = val;
    propertiesStore.setPropertyValue(cssProp, joinPaddingValue(parsed));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, partIdent) => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      let value = Number(withoutWidthUnit((e.target["value"] || "0")).trim());
      const unit = parseWidthUnit(e.target["value"]);
      if (!isNaN(value)) {
        value = value + (e.key === "ArrowUp" ? 1 : -1);
        e.preventDefault();
        switch (partIdent) {
          case "horizontal":
          case "vertical": {
            changeHandValue(partIdent, value + unit);
            break;
          }
          case "top":
          case "left":
          case "bottom":
          case "right": {
            changeQuarterValue(partIdent, value + unit);
            break;
          }
        }
      }
    }
  };

  return {
    value,
    switchValue,
    setSwitchValue,
    getHandValue,
    getQuarterValue,
    changeMainValue,
    changeHandValue,
    changeQuarterValue,
    onKeyDown
  };

};