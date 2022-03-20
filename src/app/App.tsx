import React, { FC } from "react";
import { GlobalStyles } from "./GlobalStyles";
import { Editor } from "../editor/Editor";


type AppProps = {
  exampleHtml: string;
};

export const App: FC<AppProps> = ({exampleHtml}) => {
  return (
    <>
      <GlobalStyles />
      <Editor exampleHtml={exampleHtml} />
    </>
  );
};