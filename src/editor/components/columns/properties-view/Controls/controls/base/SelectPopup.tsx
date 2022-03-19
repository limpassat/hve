import { Popup } from "../../../../../ui/Popup/Popup";
import React, { FC } from "react";
import styled from "styled-components";
import { Option } from "./Select";
import { observer } from "mobx-react";


const PopupContent = styled.div`
  background-color: white;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 6px 1px #cbcbcb;
`;

const OptionWrapper = styled.div`
  cursor: pointer;
  padding: 5px 7px;
  
  &:hover, &:focus {
    background-color: lightgray;
  }
`;

type SelectPopupProps = {
  opened: boolean;
  getTarget: () => any;
  onClose: () => void;
  options: Option[];
  onChange: (opt: Option) => void;
};

export const SelectPopup: FC<SelectPopupProps> = observer(({opened, getTarget, onClose, options, onChange}) => {
  return (
    <Popup opened={opened}
           getTarget={getTarget}
           verticalPredicate={(prev, rect) => prev + rect.height + 7}
           horizontalPredicate={(prev, rect) => innerWidth - rect.right - 5}
           anchors={["top", "right"]}
           closeAfterSelfClick={true}
           onClose={onClose}>
      <PopupContent>
        {options.map(opt => {
          return (
            <OptionWrapper key={opt}
                           onClick={() => onChange(opt)}
            >
              {opt || "-"}
            </OptionWrapper>
          );
        })}
      </PopupContent>
    </Popup>
  );
});