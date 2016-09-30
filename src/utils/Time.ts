class Time {

    private static _deltaTime: number = 0;
    private static _time: number = 0;

    public static get deltaTime(): number {
        return this._deltaTime;
    }

    public static get time(): number {
        return this._time;
    }

    public static setDeltaTime(time: number) {
        this._deltaTime = time;
    }

    public static setFrameTime(time: number) {
        this._time = time;
    }

    public static get getNanoSeconds(): number {
        return (new Date()).getTime() * 1000000;
    }

}