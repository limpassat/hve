import { observer } from "mobx-react";
import styled from "styled-components";
import React from "react";


const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
`;

export const CollapseButton = observer(({collapsed, onClick}) => {
  return (
    <Button onClick={onClick}>
      {collapsed ? "➤" : "▼"}
    </Button>
  );
});