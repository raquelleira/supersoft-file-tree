import { Component, Input, OnInit } from '@angular/core';
import { FileExplorerService } from './file-explorer.service';
import { TreeItem } from './shared/tree-item.model';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

    @Input() public folders: TreeItem[];

    constructor(
        private fileExplorerService: FileExplorerService
    ) { }

    /**
     * Inir component view.
     */
    public ngOnInit(): void {
        if (!this.folders) {
            this.getFolders(null).then((folders) => this.folders = folders);
        }
    }

    /**
     * Abre uma pasta.
     * Nesse formato, estou recuperando os arquivos e subpastas somente quando a pasta é aberta.
     */
    public openFolder(folder: TreeItem): void {
        folder.opened = true;
        // Vocês podem trabalhar uma lógica extra, para por exemplo, só recuperar os arquivos do back-end
        // quando a pasta estiver sendo aberta pela primeira vez, ou quando receber um novo upload, etc.
        this.getFolders(folder.id).then(folderFiles => folder.files = folderFiles);
    }

    /**
     * Emite uma pasta selecionada
     * @param {TreeItem}
     */
    public selectFolder(folder: TreeItem): void {
        this.fileExplorerService.emitFolder(folder);
    }

    /**
     * Esse método é chamado quando arquivos estão sendo arrastados e o mouse está sobre uma pasta.
     * @param {Event} event
     * @param {TreeItem} folder
     * @return {void}
     */
    public onOver(event: Event, folder: TreeItem): void {
        folder.over = true;
        this.stopEvent(event);
        // Opcional. Coloquei pra abrir a pasta quando vc está com o mouse em cima, arrastando arquivos
        if (!folder.opened) {
            this.openFolder(folder);
        }
    }

    /**
     * Esse método é chamado quando os arquivos são soltos em uma pasta
     * @param {Event} event
     * @param {TreeItem} folder
     * @return {void}
     */
    public onDrop(event: any, folder: TreeItem): void {
        this.stopEvent(event);
        const files = event.dataTransfer.files as FileList;
        this.onRawFileInput(files);
        folder.over = false;
    }

    /**
     * Esse método é chamado quando os arquivos estão sendo arrastados e o mouse deixa uma pasta
     * @param {Event} event
     * @param {TreeItem} folder
     * @return {void}
     */
    public onLeave(event: Event, folder: TreeItem): void {
        folder.over = false;
        this.stopEvent(event);
    }

    /**
     * File input
     * Esse método é chamado quando os arquivos são arrastados e "soltos" sobre uma pasta.
     * O processo de upload deve ser iniciado aqui.
     *
     * @param files
     */
    public onRawFileInput(files: FileList): void {
        console.log(files);
    }

    /**
     * Fecha uma pasta
     * @param {TreeItem} folder
     */
    public closeFolder(folder: TreeItem): void {
        folder.opened = false;
    }

    /**
     * Recupera itens a partir da pasta pai.
     * @param parentId
     */
    private getFolders(parentId: number): Promise<TreeItem[]> {
        return this.fileExplorerService.getFileExplorerByParentId(parentId);
    }

    /**
     * Para a propagação de eventos.
     * @param {Event} event
     * @return {void}
     */
    private stopEvent(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }

}
