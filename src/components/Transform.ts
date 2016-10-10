class Transform extends Component {

    private _position: Vector2 = Vector2.zero;
    public rotation: Rotation = Rotation.up;
    public scale: Vector2 = Vector2.zero;

    public parent: Transform = null;

    private _dir: number = null;
    private _speed: number = null;
    private _motionSet: boolean = false;

    [Symbol.iterator]() {
        let index: number = -1;
        let data: Transform[] = this.children();
        return {
            next: ()=>({value: data[++index], done: !(index in data)})
        }
    }

    private children(): Transform[] {
        let i = Engine.gameObjects.length;
        let trans: Transform[] = [];
        while (i--) {
            let go = Engine.gameObjects[i];
            if (go.transform.parent == this) {
                trans.push(go.transform);
            }
        }
        return trans;
    }

    public set position(value: Vector2) {
        this._position = value || this.parent.transform.position || Vector2.zero;
    }

    public get position(): Vector2 {
        return this._position;
    }

    public get length(): number {
        return this.children().length;
    }

    public get forward(): Vector2 {
        const phi = (this.rotation.degrees) * (Math.PI / 180);
        return new Vector2(
            Math.cos(phi),
            Math.sin(phi)
        );
    }

    public get backward(): Vector2 {
        const phi = (this.rotation.degrees - 180) * (Math.PI / 180);
        return new Vector2(
            Math.cos(phi),
            Math.sin(phi)
        );
    }

    public get up(): Vector2 {
        const phi = (this.rotation.degrees - 90) * (Math.PI / 180);
        return new Vector2(
            Math.cos(phi),
            Math.sin(phi)
        );
    }

    public get down(): Vector2 {
        const phi = (this.rotation.degrees + 90) * (Math.PI / 180);
        return new Vector2(
            Math.cos(phi),
            Math.sin(phi)
        );
    }

    public translate(translation: Vector2): void {
        this._position = new Vector2(
            this._position.x + translation.x,
            this._position.y + translation.y
        );
    }

    public lookAt(target: Vector2): void {
        this.rotation.degrees = Vector2.degrees(
            this._position,
            target
        );
    }

    public setMotion(target: number | Vector2, speed: number) {
        let dir: number;
        if (typeof target == 'number') {
            dir = target;
        } else {
            dir = Vector2.degrees(this._position, target);
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