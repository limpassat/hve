import { EditorStore } from "../EditorStore/EditorStore";
import { HTMLTree, TreeItem } from "./HTMLTree";
import { reaction, runInAction } from "mobx";


export class HierStore {

  tree = new HTMLTree();

  itemRefMap = new Map<TreeItem, HTMLElement>();

  constructor(private editorStore: EditorStore) {
    reaction(() => this.editorStore.selectedStore.selectedItem, (curr, prev) => {
      if (!!curr) {
        this.expandToItem(curr);
        setTimeout(() => {
          this.scrollToTreeItem(curr);
        });
      }
    });
  }

  init() {
    this.setBody(this.editorStore.canvasStore.body);
    this.editorStore.selectedStore.selectItem(this.tree.tree);
  }

  setBody(body: HTMLElement) {
    this.tree.init(body);
  }

  expandToItem(item: TreeItem) {
    const parents: TreeItem[] = [];
    let parent = item.parentItem;
    while (parent) {
      parents.push(parent);
      parent = parent.parentItem;
    }
    runInAction(() => {
      for (let item of parents) {
        if (!!item.collapsed) {
          item.collapsed = false;
        }
      }
    });
  }

  scrollToTreeItem(item: TreeItem) {
    const ref = this.itemRefMap.get(item);
    if (ref) {
      const name = ref.getElementsByClassName("hier-item-name")[0];
      name.scrollIntoView({inline: "end", block: "center"});
    }
  }

  setRef(ref, item) {
    if (ref) {
      this.itemRefMap.set(item, ref);
    } else {
      this.itemRefMap.delete(item);
    }
  }

}