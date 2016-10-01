class Rotation {

    public angle: number = 0;

    public constructor(angle: number = 0) {
        this.angle = angle;
    }

    public static get up(): Rotation {
        return new Rotation();
    }

    public static get right(): Rotation{
        return new Rotation(90);
    }

    public static get down(): Rotation{
        return new Rotation(180);
    }

    public static get left(): Rotation{
        return new Rotation(270);
    }

}