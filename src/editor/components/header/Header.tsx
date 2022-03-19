import React from "react";
import { Wrapper } from "./Wrapper";
import { Logo } from "./Logo";
import { HeaderButtons } from "./HeaderButtons";


export const Header = () => {
  return (
    <Wrapper>
      <Logo>
        HTML Visual Editor
      </Logo>
      <HeaderButtons />
    </Wrapper>
  );
};