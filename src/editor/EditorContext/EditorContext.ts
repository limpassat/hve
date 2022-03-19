import { createContext } from "react";
import { EditorStore } from "../stores/EditorStore/EditorStore";


export type EditorContextType = {
  editorStore: EditorStore;
};

export const EditorContext = createContext<Partial<EditorContextType>>({});