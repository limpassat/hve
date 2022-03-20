import React, { FC, forwardRef, useCallback, useContext } from "react";
import { Wrapper } from "./Wrapper";
import { observer } from "mobx-react";
import { TreeItem } from "../../../../stores/HierStore/HTMLTree";
import { EditorContext } from "../../../../EditorContext/EditorContext";
import { Name, NameWrapper } from "../Name";
import { CollapseButton } from "./CollapseButton";
import { action } from "mobx";
import { generateHSLInDiapason } from "../../../ui/utils/color/generateHSL";
import { NodeNameRandomColor } from "../../../ui/utils/color/NodeNameRandomColor";


type HierItemProps = {
  item: TreeItem;
  setRef: (ref, item) => void;
};

export const HierItem: FC<HierItemProps> = observer(({item, setRef}) => {

  const {editorStore: {selectedStore}} = useContext(EditorContext);

  const onMouseEnter = useCallback(() => {
    selectedStore.hoverItem(item);
  }, []);

  const onMouseLeave = useCallback(() => {
    selectedStore.unhover();
  }, []);

  const toggleCollapse = useCallback(action((e) => {
    e.stopPropagation();
    item.collapsed = !item.collapsed;
  }), [item.collapsed]);

  const onNameClick = useCallback(() => {
    selectedStore.unselect();
    selectedStore.selectItem(item);
  }, []);

  const hsl = NodeNameRandomColor.get(item.nodeName);

  return (
    <Wrapper ref={ref => setRef(ref, item)}>
      <NameWrapper level={item.level}
                   hovered={item.node === selectedStore.hoveredItem?.node}
                   onClick={onNameClick}
                   selected={item.node === selectedStore.selectedItem?.node}
                   onMouseEnter={onMouseEnter}
                   onMouseLeave={onMouseLeave}
                   title={item.name}
      >
        {!!item.childs.length && (
          <CollapseButton collapsed={item.collapsed}
                          onClick={toggleCollapse}
          />
        )}
        <Name className={"hier-item-name"}
              hsl={hsl}
        >
          {item.name}
        </Name>
      </NameWrapper>
      {!item.collapsed && item.childs.map((item, index) => {
        return (
          <HierItem item={item}
                    key={index}
                    setRef={setRef}
          />
        );
      })}
    </Wrapper>
  );
});