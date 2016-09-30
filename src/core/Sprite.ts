class Sprite {

    private _file: string = '';
    private _originX = 0;
    private _originY = 0;

    private _image: HTMLImageElement;

    public constructor(file: string) {
        this._file = file;
        this.load();
    }

    public load() {
        this._image = new Image();
        this._image.src = this._file;
    }

    public origin(x: number, y: number) {
        this._originX = x;
        this._originY = y;
    }

    public get image(): HTMLImageElement {
        return this._image;
    }

}