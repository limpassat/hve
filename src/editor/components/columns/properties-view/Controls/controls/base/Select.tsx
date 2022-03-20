import React, { FC, useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { ControlsContext } from "../../ControlsContext";
import { WidthUnit } from "../../../utils/parseWidthUnit";


export type Option = WidthUnit;

type SelectProps = {
  value: Option;
  options: ReadonlyArray<Option>;
  onChange: (opt: Option) => void;
};

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #4aa3ff;
  padding: 0 7px;
  background-color: #eaf8ff;
  margin-left: 5px;
  min-width: 22px;
  transform: skewX(-14deg);
`;


export const Select: FC<SelectProps> = observer(({value, options, onChange}) => {

  const ref = useRef<HTMLDivElement>();

  const {openSelectPopup} = useContext(ControlsContext);

  const openPopup = useCallback(() => {
    openSelectPopup(options, {change: onChange}, ref.current);
  }, [options, ref, onChange]);

  return (
    <Wrapper ref={ref}
             onClick={openPopup}
    >
      {value}
    </Wrapper>
  );
});