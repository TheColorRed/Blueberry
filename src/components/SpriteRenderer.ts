class SpriteRenderer extends Component {

    public depth: number = 0;
    public frame: number = 0;
    public sprite: Sprite = null;

    private _currentTime: number = 0;
    private _frames: number = 0;

    private _isVisible: boolean = true;

    public get isVisible() {
        return this._isVisible;
    }

    start() {
        this._frames = this.sprite.frames;
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
        if (this._frames > 0 && this.isVisible) {
            this._currentTime += Time.deltaTime * 0.1;
            let duration = this.sprite.duration;

            if (this._currentTime > duration * Time.deltaTime) {
                this._currentTime = 0;
                this.frame = (this.frame + 1) % this._frames;
            }
        }
    }

}