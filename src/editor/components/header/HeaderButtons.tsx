import styled from "styled-components";
import React, { useContext } from "react";
import { EditorContext } from "../../EditorContext/EditorContext";


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 58px;
  width: 100%;
  justify-content: space-between;
`;

const ButtonWrapper = styled.button`
  cursor: pointer;
  border: none;
  background-color: #FFFFFF;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  padding: 0 11px;
  color: #247cff;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: -0.5px;
  user-select: none;
  margin-left: 7px;
  transform: skewX(-14deg);
  
  &:hover, &:active {
    background: linear-gradient(rgb(213, 232, 255), #FFFFFF);
  }
`;

export const HeaderButtons = () => {

  const {editorStore} = useContext(EditorContext);

  return (
    <Wrapper>
      <ButtonWrapper onClick={() => editorStore.importFile()}>
        Import
      </ButtonWrapper>
      <ButtonWrapper onClick={() => editorStore.exportFile()}>
        Export
      </ButtonWrapper>
    </Wrapper>
  );
};