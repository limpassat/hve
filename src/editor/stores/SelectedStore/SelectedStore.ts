import { TreeItem } from "../HierStore/HTMLTree";
import { action, makeObservable, observable } from "mobx";
import { NodeType } from "../CanvasStore/CanvasStore";


export class SelectedStore {

  selectedItem: TreeItem | null;

  hoveredItem: TreeItem | null;

  constructor() {
    makeObservable(this, {
      selectedItem: observable.ref,
      selectItem: action,
      unselect: action,
      hoveredItem: observable.ref,
      hoverItem: action,
      unhover: action,
    });
  }

  selectItem(item: TreeItem) {
    this.unhover();
    const needParent = item.node.nodeType !== NodeType.ELEMENT_NODE;
    item = needParent ? item.parentItem : item;
    this.selectedItem = item;
  }

  unselect() {
    this.selectedItem = null;
  }

  hoverItem(item: TreeItem) {
    this.hoveredItem = item;
  }

  unhover() {
    this.hoveredItem = null;
  }

}