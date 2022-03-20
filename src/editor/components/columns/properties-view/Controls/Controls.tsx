import { observer } from "mobx-react";
import React, { useContext } from "react";
import { EditorContext } from "../../../../EditorContext/EditorContext";
import { Wrapper } from "./Wrapper";
import { LikeWidthControl } from "./controls/LikeWidthControl";
import { ControlsContext } from "./ControlsContext";
import { SelectPopup } from "./controls/base/SelectPopup";
import { usePopup } from "./hooks/usePopup";
import { LikePaddingControl } from "./controls/LikePaddingControl";


const likeWidthCssProps = [
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
];

const likePaddingCssProps = [
  "margin",
  "padding",
];

export const Controls = observer(() => {

  const {editorStore: {selectedStore}} = useContext(EditorContext);

  const {
    popupOpened,
    setPopupOpened,
    options,
    changeOption,
    popupTarget,
    openSelectPopup
  } = usePopup();

  if (!selectedStore.selectedItem) {
    return null;
  }

  return (
    <ControlsContext.Provider value={{openSelectPopup}}>
      <Wrapper>
        {likeWidthCssProps.map(cssProp => {
          return (
            <LikeWidthControl cssProp={cssProp}
                              key={cssProp}
            />
          );
        })}
        {likePaddingCssProps.map(cssProp => {
          return (
            <LikePaddingControl cssProp={cssProp}
                                key={cssProp}
            />
          );
        })}
      </Wrapper>
      <SelectPopup opened={popupOpened}
                   onClose={() => setPopupOpened(false)}
                   options={options}
                   getTarget={() => popupTarget}
                   onChange={changeOption?.change}
      />
    </ControlsContext.Provider>
  );
});
