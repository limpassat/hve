import styled from "styled-components";


export const HierStick = styled.div<{level: number}>`
  position: absolute;
  left: calc(12px + 25px * ${p => p.level});
  bottom: 0;
  width: 1px;
  height: calc(100% - 20px);
  background-color: #b9b9b9;
  z-index: 1;
`;