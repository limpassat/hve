import styled from "styled-components";


const getBgColor = (p: {selected: boolean, hovered: boolean}): string => {
  return p.selected ? "#aed3f9" : p.hovered ? "#cae4ff" : "transparent";
};

export const Name = styled.div<{level: number, selected: boolean, hovered: boolean}>`
  //width: 100%;
  background-color: ${getBgColor};
  padding: 3px 0 3px calc(20px * ${p => p.level});
  white-space: nowrap;
  display: inline-flex;
  width: 100%;
  
  &:hover {
    background-color: #cae4ff;
  }
`;