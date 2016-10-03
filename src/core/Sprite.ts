class Sprite {

    public duration = 1;

    private _file: string = '';
    private _originX = 0;
    private _originY = 0;

    private _width: number = 0;
    private _height: number = 0;

    private _image: HTMLImageElement;
    private _sprites: SubSprite[] = [];

    public constructor(asset: HTMLImageElement) {
        this._image = asset;
    }

    public get sprites(): SubSprite[] {
        return this._sprites;
    }

    public subImages(width: number, height: number, total: number, rows = 1) {
        let cols = Math.ceil(total / rows);
        let col = 0;
        let row = 0;
        for (let t = 0; t < total; t++) {
            let ss = new SubSprite(width, height, width * col, height * row, row, col);
            this._sprites.push(ss);
            if (col == cols - 1) {
                row++;
                col = 0;
            } else {
                col++;
            }
        }
    }

    public origin(x: number, y: number) {
        this._originX = x;
        this._originY = y;
    }

    public get image(): HTMLImageElement {
        return this._image;
    }

    public get frames(): number {
        return this._sprites.length;
    }

    public framesInRow(row: number): number {
        let total: number = 0;
        this._sprites.forEach(sprite => {
            if (sprite.row == row) {
                total++;
            }
        });
        return total;
    }

    public get height(): number {
        if (this.frames > 0) {
            return this._sprites[0].height;
        } else {
            return this._image.height;
        }
    }

    public get width(): number {
        if (this.frames > 0) {
            return this._sprites[0].width;
        } else {
            return this._image.width;
        }
    }

    public item(index: number): SubSprite {
        if (this._sprites[index]) {
            return this._sprites[index];
        }
        return null;
    }

}

class SubSprite {

    private _width: number = 0;
    private _height: number = 0;

    private _left: number = 0;
    private _top: number = 0;

    private _row: number = 0;
    private _col: number = 0;

    public constructor(width: number, height: number, left: number, top: number, row: number, col: number) {
        this._width = width;
        this._height = height;
        this._left = left;
        this._top = top;
        this._row = row;
        this._col = col;
    }

    public get width() { return this._width; }
    public get height() { return this._height; }
    public get left() { return this._left; }
    public get top() { return this._top; }
    public get row() { return this._row; }
    public get col() { return this._col; }
}