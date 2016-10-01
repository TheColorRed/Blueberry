class Random {

    public static get value(): number {
        return Random.range(0, 1);
    }

    public static get rotation(): Rotation {
        return new Rotation(Random.range(0, 360));
    }

    public static range(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static item<T>(...items: T[]): T {
        if (typeof items[0] == 'array' && items.length == 1) {
            let idx = Random.range(0, items.length - 1);
            return items[idx];
        } else {
            let idx = Random.range(0, arguments.length - 1);
            return arguments[idx];
        }
    }

    public static vector(minX: number, maxX: number, minY: number, maxY: number): Vector2 {
        return new Vector2(
            Random.range(minX, maxX),
            Random.range(minY, maxY)
        );
    }

}