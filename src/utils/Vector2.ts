class Vector2 {

    private _x: number = 0;
    private _y: number = 0;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public static distance(a: Vector2, b: Vector2): number {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        return Math.abs(dist);
    }

    public static angle(a: Vector2, b: Vector2): number {
        return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    }

    public get normalized(): Vector2 {
        // return new Vector2(b.x - a.x, b.y - a.y);
        let max = Math.max(this._x, this._y);
        return new Vector2(this._x / max, this._y / max);
    }

    public times(amount: number): Vector2 {
        let x = this._x * amount;
        let y = this._y * amount;
        let v = new Vector2(x, y);
        return v;
    }

    public dividedBy(amount: number): Vector2 {
        let x = this._x / amount;
        let y = this._y / amount;
        let v = new Vector2(x, y);
        return v;
    }

    public plus(amount: number): Vector2 {
        let x = this._x + amount;
        let y = this._y + amount;
        let v = new Vector2(x, y);
        return v;
    }

    public minus(amount: number): Vector2 {
        let x = this._x - amount;
        let y = this._y - amount;
        let v = new Vector2(x, y);
        return v;
    }

    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }

    public static get up(): Vector2 {
        return new Vector2(0, -1);
    }

    public static get down(): Vector2 {
        return new Vector2(0, 1);
    }

    public static get left(): Vector2 {
        return new Vector2(-1, 0);
    }

    public static get right(): Vector2 {
        return new Vector2(1, 0);
    }
}