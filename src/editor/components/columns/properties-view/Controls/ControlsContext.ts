import { Context, createContext } from "react";
import { Option } from "./controls/base/Select";


export type ControlsContextType = {
  openSelectPopup: (options: ReadonlyArray<Option>, changeOption: {change: (opt: Option) => void}, target) => void;
};

export const ControlsContext: Context<Partial<ControlsContextType>> = createContext<Partial<ControlsContextType>>({});