import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeItem } from './shared/tree-item.model';

@Injectable({
    providedIn: 'root'
})
export class FileExplorerService {

    public selectedFolder$: Observable<TreeItem>;
    private selectedFolderSubscription: BehaviorSubject<TreeItem> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient
    ) {
        this.selectedFolder$ = this.selectedFolderSubscription.asObservable();
    }

    /**
     * Recupera e emite a estrutura de arquivos
     * @param {number} parentId
     */
    public getFileExplorerByParentId(parentId: any = null): Promise<TreeItem[]> {
        const url = 'assets/folders.json';
        return this.httpClient.get<any>(url)
            .pipe (
                map((folders: any[]) => folders.filter(folder => folder.parentId === parentId).map(folder => new TreeItem(folder)))
            )
            .toPromise();
    }

    /**
     * Emite a pasta selecionada
     * @param {TreeItem} folder
     */
    public emitFolder(folder: TreeItem): void {
        this.selectedFolderSubscription.next(folder);
    }
}
