import styled from "styled-components";


const getBgColor = (p: {selected: boolean, hovered: boolean}): string => {
  return p.selected ? "#aed3f9" : p.hovered ? "#cae4ff" : "transparent";
};

type NameProps = {
  level: number,
  selected: boolean,
  hovered: boolean,
};

export const NameWrapper = styled.div<NameProps>`
  background-color: ${getBgColor};
  padding: 3px 0 3px calc(25px * ${p => p.level});
  white-space: nowrap;
  display: inline-flex;
  width: 100%;
  
  &:hover {
    background-color: #cae4ff;
  }
`;

export const Name = styled.span<{hsl: string}>`
  transform: skewX(-14deg);
  background-color: hsl(${p => p.hsl});
  text-transform: lowercase;
  color: #333333;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 5px;
`;