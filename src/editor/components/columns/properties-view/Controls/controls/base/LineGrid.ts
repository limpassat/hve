import styled from "styled-components";


export const LineGrid = styled.div<{columnCount: number}>`
  display: grid;
  column-gap: 5px;
  grid-template-columns: repeat(${p => p.columnCount}, 1fr);
`;