import { EditorStore } from "../stores/EditorStore/EditorStore";


export class HTMLResourceService {

  currentFileName: string = "HTML Visual Editor example.html";

  constructor(private editorStore: EditorStore) {
  }

  importFile(): Promise<string> {

    const input: HTMLInputElement = document.createElement("INPUT") as HTMLInputElement;

    return new Promise<string>((resolve, reject) => {
      input.type = "file";
      input.multiple = false;
      input.accept = ".html,.htm";

      input.onchange = () => {
        const file = input.files[0];
        this.currentFileName = file.name;
        file.text()
        .then(text => resolve(text))
        .catch(reject);
      };

      input.click();
    })
    .finally(() => {
      input.remove();
    });
  }

  exportFile(html) {
    const a = document.createElement("A") as HTMLAnchorElement;
    const file = new Blob([html], {type: "text/html"});

    a.href= URL.createObjectURL(file);
    a.download = this.currentFileName;
    a.click();

    URL.revokeObjectURL(a.href);
  }

}
