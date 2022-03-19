import { TreeItem } from "./HTMLTree";


export class HTMLTreeWalker {

  constructor(private tree: TreeItem) {
  }

  nextChild(): TreeItem {
    return this.tree;
  }

}