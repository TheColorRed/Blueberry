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
        this.subImages(asset.width, asset.height, 1, 1);
    }

    public subImages(width: number, height: number, total: number, rows = 1) {
        this._sprites = [];
        let cols = Math.ceil(total / rows);
        let col = 0;
        let row = 0;
        let frame = 0;
        for (let t = 0; t < total; t++) {
            let ss = new SubSprite(frame, width, height, width * col, height * row, row, col);
            ss.sprite = this;
            this._sprites.push(ss);
            if (col == cols - 1) {
                row++;
                col = 0;
            } else {
                col++;
            }
            frame++;
        }
        this._originX = width / 2;
        this._originY = height / 2;
    }

    public setOrigin(x: number, y: number) {
        this._originX = x;
        this._originY = y;
    }

    public getOrigin(): Vector2 {
        return new Vector2(this._originX, this._originY);
    }

    public get image(): HTMLImageElement {
        return this._image;
    }

    public get frames(): number {
        return this._sprites.length;
    }

    public get sprites(): SubSprite[] {
        return this._sprites;
    }

    public getRow(row: number): number[] {
        let sprites: number[] =[];
        this._sprites.forEach(sprite => {
            if (sprite.row == row) {
                sprites.push(sprite.frame);
            }
        });
        return sprites;
    }

    public getCol(col: number): number[] {
        let sprites: number[] =[];
        this._sprites.forEach(sprite => {
            if (sprite.col == col) {
                sprites.push(sprite.frame);
            }
        });
        return sprites;
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

    public sprite: Sprite = null;

    private _width: number = 0;
    private _height: number = 0;

    private _left: number = 0;
    private _top: number = 0;

    private _row: number = 0;
    private _col: number = 0;

    private _frame: number = 0;

    public constructor(frame: number, width: number, height: number, left: number, top: number, row: number, col: number) {
        this._width = width;
        this._height = height;
        this._left = left;
        this._top = top;
        this._row = row;
        this._col = col;
        this._frame = frame;
    }

    public get width() { return this._width; }
    public get height() { return this._height; }
    public get left() { return this._left; }
    public get top() { return this._top; }
    public get row() { return this._row; }
    public get col() { return this._col; }
    public get frame() { return this._frame; }
}