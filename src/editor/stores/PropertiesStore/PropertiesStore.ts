import { EditorStore } from "../EditorStore/EditorStore";
import { action, makeObservable, observable, reaction } from "mobx";
import { NodeType } from "../CanvasStore/CanvasStore";


export class PropertiesStore {

  styles: CSSStyleDeclaration;


  constructor(private editorStore: EditorStore) {
    makeObservable(this, {
      styles: observable,
      setPropertyValue: action,
      initStyle: action,
    });
    reaction(() => this.editorStore.selectedStore.selectedItem, (current, prev) => {
      if (!!current) {
        this.initStyle(current.node as Element);
      }
    });
    window.addEventListener("resize", () => {
      const {selectedItem} = this.editorStore.selectedStore;
      if (selectedItem) {
        this.initStyle(selectedItem.node as Element);
      }
    });
  }

  initStyle(el: Element) {
    if (el.nodeType === NodeType.ELEMENT_NODE) {
      this.styles = {...getComputedStyle(el)};
    }
  }

  getPropertyValue(cssProp: string) {
    return this.styles[cssProp];
  }

  setPropertyValue(cssProp: string, val: string) {
    const element = this.editorStore.selectedStore.selectedItem?.node as HTMLElement;
    const inlineStyle = element && element.style || {};
    inlineStyle[cssProp] = val;
    this.styles[cssProp] = val;
  }

}
