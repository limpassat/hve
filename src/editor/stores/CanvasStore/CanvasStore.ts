import { createRef } from "react";
import { EditorStore } from "../EditorStore/EditorStore";
import { reaction } from "mobx";
import { CustomElementsStore } from "./CustomElementsStore";


export enum NodeType {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  ENTITY_REFERENCE_NODE = 5,
  ENTITY_NODE = 6,
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
  NOTATION_NODE = 12,
}

const needInsetBoxShadow = (el) => ["HTML", "BODY"].includes(el.tagName);

export class CanvasStore {

  iframeRef = createRef<HTMLIFrameElement>();

  observer: MutationObserver;

  customElementsStore = new CustomElementsStore();

  constructor(private editorStore: EditorStore) {
    this.observer = new MutationObserver(this.mutationCallback);
    reaction(() => editorStore.selectedStore.hoveredItem, (current, prev) => {
      if (!!current) {
        const needParent = current.node.nodeType === NodeType.TEXT_NODE;
        const elToHover = needParent
          ? current.node.parentElement
          : current.node;
        this.hoverElement(elToHover);
      } else if (!!prev) {
        const needParent = prev.node.nodeType === NodeType.TEXT_NODE;
        const elToUnhover = needParent
          ? prev.node.parentElement
          : prev.node;
        this.unhoverElement(elToUnhover);
      }
    });
    reaction(() => editorStore.selectedStore.selectedItem, (current, prev) => {
      if (!!current) {
        const needParent = current.node.nodeType === NodeType.TEXT_NODE;
        const elToSelect = needParent
          ? current.node.parentElement
          : current.node;
        this.selectElement(elToSelect);
      } else if (!!prev) {
        const needParent = prev.node.nodeType === NodeType.TEXT_NODE;
        const elToUnselect = needParent
          ? prev.node.parentElement
          : prev.node;
        this.unselectElement(elToUnselect);
      }
    });
  }

  get body(): HTMLElement {
    return this.iframeRef.current.contentDocument.body;
  }

  mutationCallback(mutations: MutationRecord[], observer: MutationObserver) {
  }

  setContentEditable(el: HTMLElement, val: boolean) {
    el.contentEditable = String(!!val);
    el.focus();
  }

  connectObserver() {
    this.observer.observe(this.body, {
      attributes: true,
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  addEventListeners() {
    this.iframeRef.current.contentDocument.addEventListener("mouseover", this.onMouseOver.bind(this));
    this.iframeRef.current.contentDocument.addEventListener("mouseout", this.onMouseOut.bind(this));
    this.iframeRef.current.contentDocument.addEventListener("click", this.onClick.bind(this));
  }

  disableOutline() {
    this.customElementsStore.addElement(() => {
      const el = document.createElement("STYLE");
      el.innerHTML = "* { outline: none; }";
      this.iframeRef.current.contentDocument.head.appendChild(el);
      return el;
    });
  }

  onMouseOver(e: MouseEvent) {
    const item = this.editorStore.hierStore.tree.nodeToItemMap.get(e.target as Node);
    item && this.editorStore.selectedStore.hoverItem(item);
  }

  onMouseOut(e: MouseEvent) {
    this.editorStore.selectedStore.unhover();
  }

  onClick(e: MouseEvent) {
    e.stopPropagation();
    this.editorStore.selectedStore.unselect();
    const item = this.editorStore.hierStore.tree.nodeToItemMap.get(e.target as Node);
    item && this.editorStore.selectedStore.selectItem(item);
  }

  setHTMLIntoBody(html: string): Promise<void> {
    this.customElementsStore.elementCreators = [];
    return new Promise((resolve) => {
      this.iframeRef.current.src = URL.createObjectURL(new Blob([html], {type: "text/html"}));
      this.iframeRef.current.addEventListener("load", () => {
        this.connectObserver();
        this.addEventListeners();
        this.disableOutline();
        resolve();
      }, {once: true});
    });
  }

  preExport() {
    this.customElementsStore.removeElements();
    const {hoveredItem, selectedItem} = this.editorStore.selectedStore;
    hoveredItem && this.removeHoverStyle(hoveredItem.node);
    selectedItem && this.removeSelectStyle(selectedItem.node);
  }

  postExport() {
    this.customElementsStore.returnElements();
    const {hoveredItem, selectedItem} = this.editorStore.selectedStore;
    hoveredItem && this.setHoverStyle(hoveredItem.node);
    selectedItem && this.setSelectStyle(selectedItem.node);
  }

  getHTMLForExport(): string {
    const html = this.iframeRef.current.contentDocument.documentElement.outerHTML;
    return html;
  }

  setHoverStyle(el) {
    if (el !== this.editorStore.selectedStore.selectedItem?.node) {
      el.style["old-box-shadow"] = el.style["box-shadow"];
      el.style["box-shadow"] = `${needInsetBoxShadow(el) ? "inset" : ""} 0 0 0px 1px rgb(134 180 249)`;
    }
    el.style["oldBackgroundColor"] = el.style.backgroundColor;
    el.style.backgroundColor = "rgba(0, 94, 235, 30%)";
  }

  removeHoverStyle(el) {
    if (el !== this.editorStore.selectedStore.selectedItem?.node) {
      el.style["box-shadow"] = el.style["old-box-shadow"] || null;
    }
    el.style.backgroundColor = el.style["oldBackgroundColor"] || null;
  }

  setSelectStyle(el) {
    el.style["box-shadow"] = `${needInsetBoxShadow(el) ? "inset" : ""} 0 0 0px 2px rgb(134 180 249)`;
    this.setContentEditable(el, true);
  }

  removeSelectStyle(el) {
    el.style["box-shadow"] = el.style["old-box-shadow"] || null;
    this.setContentEditable(el, false);
  }

  hoverElement(el) {
    if (this.editorStore.selectedStore.selectedItem?.node !== el) {
      if (el.nodeType === NodeType.ELEMENT_NODE) {
        this.setHoverStyle(el);
      }
    }
  }

  unhoverElement(el) {
    if (el.nodeType === NodeType.ELEMENT_NODE) {
      this.removeHoverStyle(el);
    }
  }

  selectElement(el) {
    if (el.nodeType === NodeType.ELEMENT_NODE) {
      this.setSelectStyle(el);
    }
  }

  unselectElement(el) {
    if (el.nodeType === NodeType.ELEMENT_NODE) {
      this.removeSelectStyle(el)
    }
  }

}
