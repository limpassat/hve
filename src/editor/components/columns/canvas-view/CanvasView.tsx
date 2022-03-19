import React, { useContext } from "react";
import { Wrapper } from "./Wrapper";
import { Iframe } from "./Iframe";
import { EditorContext } from "../../../EditorContext/EditorContext";


export const CanvasView = () => {

  const {editorStore} = useContext(EditorContext);

  return (
    <Wrapper>
      <Iframe ref={editorStore.canvasStore.iframeRef}
      />
    </Wrapper>
  );
};
