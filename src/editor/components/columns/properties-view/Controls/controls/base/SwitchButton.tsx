import styled from "styled-components";
import React, { FC, useCallback } from "react";


const Wrapper = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #4aa3ff;
  padding: 0 7px;
  background-color: #eaf8ff;
  margin-left: 5px;
  min-width: 22px;
`;

export type SwitchVariant = {
  id: string;
  content: JSX.Element | string;
  title?: string;
};

type SwitchButtonProps = {
  variants: SwitchVariant[];
  value: SwitchVariant["id"];
  onChange: (id: SwitchVariant["id"]) => void;
};

export const SwitchButton: FC<SwitchButtonProps> = ({variants, value, onChange}) => {

  const current = variants.find(v => v.id === value);

  const turnNext = useCallback(() => {
    const currentIndex = variants.findIndex(v => v.id === value);
    const nextIndex = currentIndex >= (variants.length - 1) ? 0 : currentIndex + 1;
    onChange(variants[nextIndex].id);
  }, [variants, value]);

  if (!current) {
    return null;
  }

  return (
    <Wrapper onClick={turnNext}
             title={current.title}
    >
      {current.content}
    </Wrapper>
  );
};
