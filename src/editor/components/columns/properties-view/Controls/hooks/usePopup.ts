import { useCallback, useState } from "react";
import { Option } from "../controls/base/Select";


export const usePopup = () => {

  const [popupOpened, setPopupOpened] = useState(false);

  const [options, setOptions] = useState([]);

  const [changeOption, setChangeOption] = useState<{change: (opt: Option) => void}>();

  const [popupTarget, setPopupTarget] = useState();

  const openSelectPopup = (options, changeOption, target) => {
    setOptions(options);
    setChangeOption(changeOption);
    setPopupTarget(target);
    setPopupOpened(true);
  };

  return {
    popupOpened,
    setPopupOpened,
    options,
    changeOption,
    popupTarget,
    openSelectPopup
  };
}