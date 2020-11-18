import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { FileExplorerComponent } from './file-explorer.component';
import { FileExplorerService } from './file-explorer.service';

@NgModule({
    declarations: [FileExplorerComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatIconModule,
        MatListModule
    ],
    providers: [
        FileExplorerService
    ],
    exports: [
        FileExplorerComponent
    ]
})
export class FileExplorerModule { }
