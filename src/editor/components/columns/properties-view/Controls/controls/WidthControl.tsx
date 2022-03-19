import { observer } from "mobx-react";
import { ControlWrapper } from "./base/ControlWrapper";
import React from "react";
import { ControlTitle } from "./base/ControlTitle";
import { Select } from "./base/Select";
import { ValueInput } from "./base/ValueInput";
import { ControlBody } from "./base/ControlBody";
import { useWidthControl } from "../hooks/useWidthControl";
import { widthUnits } from "../../utils/parseWidthUnit";


export const WidthControl = observer(({cssProp}) => {

  const {
    unit,
    value,
    onChangeInput,
    onChangeUnit,
    onKeyDown
  } = useWidthControl(cssProp);

  return (
    <ControlWrapper>
      <ControlTitle>
        {cssProp}
      </ControlTitle>
      <ControlBody>
        <ValueInput value={value}
                    onChange={onChangeInput}
                    onKeyDown={onKeyDown}
        />
        <Select value={unit}
                options={widthUnits}
                onChange={onChangeUnit} />
      </ControlBody>
    </ControlWrapper>
  );
});