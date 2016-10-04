class SpriteRenderer extends Component {

    public depth: number = 0;
    public frame: number = 0;
    public sprite: Sprite = null;

    private _currentTime: number = 0;
    private _frames: number = 1;
    private _sprites: SubSprite[] = [];

    private _frameList: number[] = [];
    private _isVisible: boolean = true;

    public get isVisible() {
        return this._isVisible;
    }

    start() {
        this._frames = this.sprite.frames;
        this._sprites = this.sprite.sprites;
    }

    update() {
        if (
            this.transform.position.x + this.sprite.width < 0 ||
            this.transform.position.y + this.sprite.height < 0 ||
            this.transform.position.x > Stage.width ||
            this.transform.position.y > Stage.height
        ) {
            this._isVisible = false;
        } else {
            this._isVisible = true;
        }
        if (this._frames > 0 && this._sprites.length > 0 && this.isVisible) {
            this._currentTime += Time.deltaTime * 0.1;
            let duration = this.sprite.duration;

            if (this._currentTime > duration * Time.deltaTime) {
                this._currentTime = 0;
                this.frame = (this.frame + 1) % this._frames;
            }
        }
    }

    public set duration(speed: number) {
        this.sprite.duration = speed;
    }

    /**
     * Get the current sprite to draw.
     *
     * @returns {SubSprite}
     *
     * @memberOf SpriteRenderer
     */
    public drawableSprite(): SubSprite {
        return this._sprites[this.frame];
    }

    /**
     * Plays the entire sprite sheet from the master image.
     *
     *
     * @memberOf SpriteRenderer
     */
    public play(): void {
        let sprites: SubSprite[] = this.sprite.sprites;
        this._frames = sprites.length;
        this._sprites = sprites;
        this._frameList = [];
    }

    /**
     * Plays a sprite sheet row from the master image.
     *
     * @param {number} row The row number form the master image.
     *
     * @memberOf SpriteRenderer
     */
    public playRow(row: number): void {
        this['playFrames'].apply(this, this.sprite.getRow(row));
    }

    /**
     * Plays a sprite sheet column from the master image.
     *
     * @param {number} col The column number from the master image.
     *
     * @memberOf SpriteRenderer
     */
    public playCol(col: number): void {
        this['playFrames'].apply(this, this.sprite.getCol(col));
    }

    /**
     * Plays select frames from the master image.
     *
     * @param {...number[]} frames The list of frames to play.
     *
     * @memberOf SpriteRenderer
     */
    public playFrames(...frames: number[]): void {
        if (!this.isSame(this._frameList, frames)) {
            let sprites: SubSprite[] = [];
            for (let i in frames) {
                let sprite = this.getFrame(frames[i]);
                if (sprite) {
                    sprites.push(sprite);
                }
            }
            this.resetFrame();
            this._frames = sprites.length;
            this._frameList = frames;
            this._sprites = sprites;
        }
    }

    public playRange(start: number, end: number) {
        let frames: number[] = [];
        if (start < end) {
            for (var i = start; i <= end; i++) {
                frames.push(i);
            }
        } else {
            for (var i = end; i >= start; i--) {
                frames.push(i);
            }
        }
        this['playFrames'].apply(this, frames);
    }

    private getFrame(frame): SubSprite {
        for (let i in this.sprite.sprites) {
            let sprite = this.sprite.sprites[i];
            if (sprite.frame == frame) {
                return sprite;
            }
        }
        return null;
    }

    private resetFrame() {
        this.frame = 0;
    }

    private isSame(arr1, arr2) {
        return (JSON.stringify(arr1) === JSON.stringify(arr2));
    }

}