class Vector2 {

    private _x: number = 0;
    private _y: number = 0;

    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public times(amount: number): this {
        this._x *= amount;
        this._y *= amount;
        return this;
    }

    public dividedBy(amount: number): this {
        this._x /= amount;
        this._y /= amount;
        return this;
    }

    public plus(amount: number): this {
        this._x += amount;
        this._y += amount;
        return this;
    }

    public minus(amount: number): this {
        this._x -= amount;
        this._y -= amount;
        return this;
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