interface TreeItemInterface {
    id: number;
    name: string;
    parentId: number;
    files: TreeItem[];
    opened: boolean;
    isFolder: boolean;
    over: boolean;
}

export class TreeItem implements TreeItemInterface {
    public id: number;
    public name: string;
    public parentId: number;
    public files: TreeItem[];
    public opened: boolean;
    public isFolder: boolean;
    public over: boolean;

    constructor({
        id,
        name,
        parentId,
        files,
        opened,
        isFolder,
        over
    }: {
        id?: number;
        name?: string;
        parentId?: number;
        files?: TreeItem[];
        opened?: boolean;
        isFolder?: boolean;
        over?: boolean;
    }) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.files = files || [];
        this.opened = opened;
        this.isFolder = isFolder;
        this.over = over;
    }
}
