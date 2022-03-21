import React, { useCallback, useContext } from "react";
import { Wrapper } from "./Wrapper";
import { observer } from "mobx-react";
import { EditorContext } from "../../../EditorContext/EditorContext";
import { HierItem } from "./hier-item/HierItem";
import { Title } from "./Title";
import { HierWrapper } from "./HierWrapper";


export const HierView = observer(() => {

  const {editorStore: {hierStore}} = useContext(EditorContext);

  const {tree} = hierStore.tree;

  const setRef = useCallback((ref, item) => {
    hierStore.setRef(ref, item);
  }, []);

  return (
    <Wrapper>
      <Title>
        Structure
      </Title>
      <HierWrapper>
        {tree && (
          <HierItem item={tree}
                    setRef={setRef}
          />
        )}
      </HierWrapper>
    </Wrapper>
  );
});
