

export type ElementCreator = () => HTMLElement;

export class CustomElementsStore {

  elements: HTMLElement[] = [];

  elementCreators: ElementCreator[] = [];

  addElement(creator: ElementCreator) {
    this.elementCreators.push(creator);
    this.elements.push(creator());
  }

  removeElements() {
    this.elements.forEach(el => el.remove());
  }

  returnElements() {
    this.elements = [];
    this.elementCreators.forEach(creator => {
      this.elements.push(creator());
    });
  }

}