import { action, makeObservable, observable, runInAction } from "mobx";


export type TreeItem = {
  node: Node;
  parent: Node;
  parentItem: TreeItem | null;
  name?: string;
  childs?: TreeItem[];
  collapsed: boolean;
  level: number;
};

export class HTMLTree {

  nodeToItemMap = new Map<Node, TreeItem>();

  tree: TreeItem;

  constructor() {
    makeObservable(this, {
      tree: observable.ref,
      insertItem: action,
    });
  }

  init(body: HTMLElement) {
    const startItem = this.insertItem(body);
    runInAction(() => {
      startItem.collapsed = false;
      this.tree = startItem;
      this.tree.parentItem = null;
    });

    const walker = document.createTreeWalker(body, NodeFilter.SHOW_ALL);
    let nextNode = walker.nextNode();

    while (nextNode !== null) {
      const parentChilds = this.nodeToItemMap.get(nextNode.parentElement).childs;
      const item = this.insertItem(nextNode);
      runInAction(() => parentChilds.push(item));
      nextNode = walker.nextNode();
    }
  }

  insertItem(node: Node): TreeItem {
    const item = this.createItem(node);
    this.nodeToItemMap.set(node, item);
    return item;
  }

  createItem(node: Node): TreeItem {
    const item: TreeItem = {
      node: node,
      parent: node.parentNode,
      name: node.nodeName,
      childs: [],
      collapsed: true,
      level: this.getNodeLevel(node),
      parentItem: this.nodeToItemMap.get(node.parentNode)
    };
    makeObservable(item, {
      collapsed: observable,
      childs: observable.shallow,
      name: observable,
      level: observable
    });
    return item;
  }

  getNodeLevel(node: Node): number {
    const parent = this.nodeToItemMap.get(node.parentNode);
    return parent ? parent.level + 1 : 0;
  }

}
