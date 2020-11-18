import { Component, OnInit } from '@angular/core';
import { TreeItem } from './file-explorer/shared/tree-item.model';
import { FileExplorerService } from './file-explorer/file-explorer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app-escritorio-virtual';

    public folder: TreeItem;

    constructor(
        private fileExplorerService: FileExplorerService
    ) {}

    public ngOnInit(): void {
        this.fileExplorerService.selectedFolder$
            .subscribe(folder => this.folderSelected(folder));
    }

    public folderSelected(folder: TreeItem): void {
        this.folder = folder;
    }
}
