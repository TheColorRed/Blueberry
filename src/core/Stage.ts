class Stage {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    private static instance: Stage = null;

    public static create(selector: string = 'body'): Stage {
        let stage = new Stage();
        stage.canvas = document.createElement('canvas') as HTMLCanvasElement;
        stage.context = stage.canvas.getContext('2d') as CanvasRenderingContext2D;
        let loc = document.querySelector(selector);
        loc.appendChild(stage.canvas);
        Stage.instance = stage;
        return stage;
    }

    public static get width(): number {
        return Stage.instance.canvas.width;
    }

    public static get height(): number {
        return Stage.instance.canvas.height;
    }

    public static set width(x: number) {
        Stage.instance.canvas.width = x;
    }

    public static set height(y: number) {
        Stage.instance.canvas.height = y;
    }

    public static size(x: number, y: number) {
        Stage.width = x;
        Stage.height = y;
    }

    public static maximize() {
        Stage.width = window.innerWidth;
        Stage.height = window.innerHeight;
    }

    public static clear() {
        Stage.instance.context.clearRect(0, 0, Stage.width, Stage.height);
    }

    public static draw(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, offsetX: number, offsetY: number, width?: number, height?: number, canvasOffsetX?: number, canvasOffsetY?: number, canvasImageWidth?: number, canvasImageHeight?: number) {
        Stage.instance.context.drawImage(
            image,
            Math.round(offsetX), Math.round(offsetY),
            Math.round(width), Math.round(height),
            Math.round(canvasOffsetX), Math.round(canvasOffsetY),
            Math.round(canvasImageWidth), Math.round(canvasImageHeight)
        );
    }

    // private create() {
    //     let loc = document.querySelector(this._selector);
    //     loc.appendChild(this.canvas);
    // }

}