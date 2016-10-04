class Transform extends Component {

    public position: Vector2 = Vector2.zero;
    public rotation: Rotation = Rotation.up;
    public scale: Vector2 = Vector2.zero;

    private _dir: number = null;
    private _speed: number = null;
    private _motionSet: boolean = false;

    public translate(translation: Vector2): void {
        this.position = new Vector2(
            this.position.x + translation.x,
            this.position.y + translation.y
        );
    }

    public setMotion(target: number | Vector2, speed: number) {
        let dir: number;
        if (typeof target == 'number') {
            dir = target;
        } else {
            dir = Vector2.angle(this.position, target);
        }
        this._dir = dir;
        this._speed = speed;
        this._motionSet = true;
    }

    update() {
        if (this._motionSet) {
            this.translate(new Vector2(
                Math.cos(this._dir * Math.PI / 180),
                Math.sin(this._dir * Math.PI / 180)
            ).times(this._speed));
        }
    }

}