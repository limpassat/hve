import { PaddingValue } from "./parsePaddingValue";


export const joinPaddingValue = (val: PaddingValue): string => {
  return `${val.top} ${val.right} ${val.bottom} ${val.left}`;
}