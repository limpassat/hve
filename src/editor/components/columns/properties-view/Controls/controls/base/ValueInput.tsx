import styled from "styled-components";
import React, { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { observer } from "mobx-react";


const Input = styled.input`
  height: 27px;
  border: 1px solid #b9b9b9;
  background-color: #ffffff;
  outline: none;
  width: 100%;
  padding: 0 7px;
  transform: skewX(-14deg);
  
  &:focus, &:active {
    border-color: #4aa3ff;
  }
`;

type ValueInputProps = {
  value: string;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const ValueInput: FC<ValueInputProps> = observer(({value, onChange, onKeyDown}) => {

  const ref = useRef<HTMLInputElement>();

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(e);
  }, []);

  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);

  const onBlur = () => setFocused(false);

  const numValue = parseInt(value);

  const isNum = !isNaN(numValue);

  value = String(focused
    ? isNum
      ? !!numValue ? value : ""
      : value
    : value);

  return (
    <Input type={"text"}
           ref={ref}
           value={value}
           onFocus={onFocus}
           onBlur={onBlur}
           onKeyDown={handleKeyDown}
           onChange={onInputChange}
    />
  );
});
