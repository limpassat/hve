import { HierStore } from "../HierStore/HierStore";
import { PropertiesStore } from "../PropertiesStore/PropertiesStore";
import { CanvasStore } from "../CanvasStore/CanvasStore";
import { SelectedStore } from "../SelectedStore/SelectedStore";
import { HTMLResourceService } from "../../services/HTMLResourceService";
import example from "../../../examples/example.html?raw";

export class EditorStore {

  selectedStore = new SelectedStore();

  hierStore = new HierStore(this);

  propertiesStore = new PropertiesStore(this);

  canvasStore = new CanvasStore(this);

  htmlResourceService = new HTMLResourceService(this);

  constructor() {
  }

  init() {
    this.setHTMLIntoBody(example);
  }

  setHTMLIntoBody(html: string) {
    this.canvasStore.setHTMLIntoBody(html)
    .then(() => {
      this.hierStore.init();
    });
  }

  importFile() {
    this.htmlResourceService.importFile()
    .then(htmlText => {
      this.setHTMLIntoBody(htmlText);
    });
  }

  exportFile() {
    this.canvasStore.preExport();
    const html = this.canvasStore.getHTMLForExport();
    this.htmlResourceService.exportFile(html);
    this.canvasStore.postExport();
  }

}
