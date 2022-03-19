import { ControlWrapper } from "./base/ControlWrapper";
import { ControlTitle } from "./base/ControlTitle";
import { ControlBody } from "./base/ControlBody";
import { ValueInput } from "./base/ValueInput";
import React from "react";
import { SwitchButton, SwitchVariant } from "./base/SwitchButton";
import { observer } from "mobx-react";
import { LineGrid } from "./base/LineGrid";
import { usePaddingControl } from "../hooks/usePaddingControl";


const switchVariants: SwitchVariant[] = [
  {id: "full", content: "F", title: "Full"},
  {id: "hand", content: "H", title: "Hand"},
  {id: "quarter", content: "Q", title: "Quarter"}
];


export const PaddingControl = observer(({cssProp}) => {

  const {
    value,
    switchValue,
    setSwitchValue,
    getHandValue,
    getQuarterValue,
    changeMainValue,
    changeHandValue,
    changeQuarterValue,
    onKeyDown
  } = usePaddingControl(cssProp);

  return (
    <ControlWrapper>
      <ControlTitle>
        {cssProp}
      </ControlTitle>
      <ControlBody>
        {switchValue === "full" && (
          <ValueInput value={value}
                      onChange={changeMainValue}
          />
        )}
        {switchValue === "hand" && (
          <LineGrid columnCount={2}>
            <ValueInput value={getHandValue("vertical")}
                        onChange={val => changeHandValue("vertical", val)}
                        onKeyDown={e => onKeyDown(e, "vertical")}
            />
            <ValueInput value={getHandValue("horizontal")}
                        onChange={val => changeHandValue("horizontal", val)}
                        onKeyDown={e => onKeyDown(e, "horizontal")}
            />
          </LineGrid>
        )}
        {switchValue === "quarter" && (
          <LineGrid columnCount={4}>
            <ValueInput value={getQuarterValue("top")}
                        onChange={val => changeQuarterValue("top", val)}
                        onKeyDown={e => onKeyDown(e, "top")}
            />
            <ValueInput value={getQuarterValue("right")}
                        onChange={val => changeQuarterValue("right", val)}
                        onKeyDown={e => onKeyDown(e, "right")}
            />
            <ValueInput value={getQuarterValue("bottom")}
                        onChange={val => changeQuarterValue("bottom", val)}
                        onKeyDown={e => onKeyDown(e, "bottom")}
            />
            <ValueInput value={getQuarterValue("left")}
                        onChange={val => changeQuarterValue("left", val)}
                        onKeyDown={e => onKeyDown(e, "left")}
            />
          </LineGrid>
        )}
        <SwitchButton variants={switchVariants}
                      value={switchValue}
                      onChange={setSwitchValue} />
      </ControlBody>
    </ControlWrapper>
  );
});
