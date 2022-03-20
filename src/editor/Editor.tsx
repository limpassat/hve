import React, { useEffect } from "react";
import { Wrapper } from "./components/Wrapper";
import { HierView } from "./components/columns/hier-view/HierView";
import { PropertiesView } from "./components/columns/properties-view/PropertiesView";
import { CanvasView } from "./components/columns/canvas-view/CanvasView";
import { Header } from "./components/header/Header";
import { EditorContext, EditorContextType } from "./EditorContext/EditorContext";
import { EditorStore } from "./stores/EditorStore/EditorStore";


const editorContextValue: EditorContextType = {
  editorStore: new EditorStore(),
};

export const Editor = ({exampleHtml}) => {

  useEffect(() => {
    editorContextValue.editorStore.setHTMLIntoBody(exampleHtml);
  }, []);

  return (
    <EditorContext.Provider value={editorContextValue}>
      <Wrapper>
        <Header />
        <HierView />
        <CanvasView />
        <PropertiesView />
      </Wrapper>
    </EditorContext.Provider>
  );
};
